
var bg = "#256188";
var nbsp = "\u00A0";
var arrow = "\u25B6";

var consoleArgs = [
    "%c Pivotal++"+nbsp+"%c %c"+nbsp+"initializing..."+nbsp,
    "font-size:10px;color:white;border:1px "+bg+" solid;border-right:none;background:"+bg+";line-height:20px",
    "font-size:12px;color:"+bg+";border:1px "+bg+" solid;padding-bottom:1px;",
    "font-size:10px;color:"+bg+";border:1px "+bg+" solid;border-left:none;"
];

/* No "bandaid"
consoleArgs = [
    "%c Pivotal++"+nbsp+"%c"+nbsp+"initializing..."+nbsp,
    "font-size:10px;color:white;border:1px "+bg+" solid;border-right:none;background:"+bg+";",
    "font-size:10px;color:"+bg+";border:1px "+bg+" solid;border-left:none;"
];
*/

console.log.apply(console, consoleArgs);

var buttonCSS = " -moz-border-radius: 3px;\
                  -webkit-border-radius: 3px;\
                  border-radius: 3px;\
                  display: inline-block;\
                  background-color: #3472a4;\
                  color: #FFF;\
                  border: none;\
                  font-size: 11px;\
                  font-weight: bold;\
                  padding: 0 14px;\
                  line-height: 25px;"



chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "interactive") {
            clearInterval(readyStateCheckInterval);

            var loc = document.location.pathname;
            if (loc == "/time_shifts")
                time_shifts();
            else if (loc ==  "/time_shifts/new" || loc.match(/\/time_shifts\/\d+\/edit/))
                time_shifts_new_edit();
        }
    }, 10);
});

function time_shifts_new_edit() {
    jQuery.noConflict();
    var $oldBox = jQuery("#shift_description");
    var $newBox = jQuery("<textarea>")
        .attr("class", $oldBox.attr("class"))
        .attr("id",    $oldBox.attr("id"))
        .attr("name",  $oldBox.attr("name"))
        .css("width",  "500px")
        .css("height", "200px")
        .text($oldBox.val());
    $oldBox.replaceWith($newBox);

    var $cql = jQuery("div.calendar_quick_links");
    $cql.removeClass("calendar_quick_links")
        .css("display", "inline-block")
        .css("font-size", 0)
        .css("margin-left", "5px")
        .attr("id","calendar_quick_links");
    jQuery("div#calendar_div").after($cql).css("display", "inline-block");

    $cql.html($cql.html().replace("|", ""));
    jQuery("#yesterday, #today").attr("style", buttonCSS);
    var $yesterday = jQuery("#yesterday");
    $yesterday.css("border-top-right-radius", 0);
    $yesterday.css("border-bottom-right-radius", 0);
    var $today = jQuery("#today");
    $today.css("border-top-left-radius", 0);
    $today.css("border-bottom-left-radius", 0);
}

function time_shifts() {
    jQuery("#new_shift_button").attr("style", buttonCSS);
    var $spp = jQuery("#set_pay_period");
    $spp.css("font-size", 0)
        .css("margin-left", "5px");
    $spp.html($spp.html().replace("|", ""));

    var $yesterday = $spp.children("a").first();
    var $today = $spp.children("a").last();
    jQuery($yesterday.add($today)).attr("style", buttonCSS);
    $yesterday.css("border-top-right-radius", 0);
    $yesterday.css("border-bottom-right-radius", 0);
    $today.css("border-top-left-radius", 0);
    $today.css("border-bottom-left-radius", 0);
}
