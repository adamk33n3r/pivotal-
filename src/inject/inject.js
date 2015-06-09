
var bg = "#256188";
var consoleArgs = [
    "%c Pivotal++ %c▶%c initializing... ",
    "background:"+bg+";color:white;font-size:20px",
    "font-size:25px;color:"+bg+";border:1px "+bg+" solid;padding-bottom:2px;border-right:none",
    "font-size:20px;color:"+bg+";border:1px "+bg+" solid;padding:4px 0 3px 0;border-left:none;"
];


for (var i = 2; i < consoleArgs.length; i++) {
    //consoleArgs[i] = "line-height:30px;" + consoleArgs[i];
}

console.log.apply(console, consoleArgs);

var buttonCSS = " -moz-border-radius: 3px;\
                  -webkit-border-radius: 3px;\
                  border-radius: 3px;\
                  display: inline;\
                  background-color: #3472a4;\
                  color: #FFF;\
                  border: none;\
                  font-size: 11px;\
                  font-weight: bold;\
                  padding: 7px 14px;"



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
    jQuery("#yesterday").css("border-top-right-radius", 0);
    jQuery("#yesterday").css("border-bottom-right-radius", 0);
    jQuery("#today").css("border-top-left-radius", 0);
    jQuery("#today").css("border-bottom-left-radius", 0);
}

function time_shifts() {
    jQuery("#new_shift_button").attr("style", buttonCSS);
}
