// Add time row function
function timeRow(hour) {
 
    var hourText = moment(hour, "H").format("H a");
    var rowEl = $("<div>")
        .addClass("row time-block")
        .attr("data-hour", hour);
    // Add row element

    var hourEl = $("<div>")
        .addClass("col-2 hour")
        .text(hourText)
    // .attr("style", "font-weight: bolder; font-size: 20px; display: flex; align-items: center; justify-content: center");

    var textAreaEl = $("<textarea>")
        .addClass("col-8 description")
        .attr("style", "color: black; font-size: 20px");

    var description = localStorage.getItem(hour);
    textAreaEl.val(localStorage.getItem(hour));

    var button = $("<button>")
        .addClass("col-2 saveBtn")
        .attr("data-hour", hour)
    // .attr("style", "font-size: 40px");

    button.click(function () {
        // Get dataset hour value
        var logTime = $(this).attr("data-hour");
        // var logTime = $(this).attr("id");
        var logText = $(this).siblings(".description").val();
        console.log(logTime + " " + logText);
        localStorage.setItem(logTime, logText);
        alert("Saved!")
    });

    var icon = $("<i>").addClass("fas fa-save");

    button.append(icon);
    rowEl.append(hourEl, textAreaEl, button);
    return rowEl;
}
// Add update row function
function updateRow(row) {
    var currentHour = 12; //moment().hours();
    var rowHour = parseInt(row.attr("data-hour"));
    // Get the textarea element
    var textArea = row.children(".description");
    if (rowHour < currentHour) {
        textArea.addClass("past");
    } else if (rowHour === currentHour) {
        textArea.addClass("present");
    } else {
        textArea.addClass("future");
    }
}
// Add init function
function init() {

    for (var i = 9; i < 18; i++) {
        var rowEl = timeRow(i);
        $(".container").append(rowEl);

        updateRow(rowEl);
    }

    window.setInterval(function () {
       
        $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
        $(".time-block").each(function () {
            updateRow($(this));
        })
    }, 1000);
}

$(document).ready(function () {
    init();
});