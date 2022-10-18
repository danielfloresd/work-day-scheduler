// Add time row function
function timeRow(hour) {
    // Convert the hour to a 12 hour format using moment.js
    var hourText = moment(hour, "H").format("h a").toUpperCase();
    var rowEl = $("<div>")
        .addClass("row time-block")
        .attr("data-hour", hour);
    // Add row element

    var hourEl = $("<div>")
        .addClass("col-1 hour")
        .text(hourText)
        .attr("style", "font-weight: bolder; font-size: 20px; display: flex; align-items: center; justify-content: center");
    // Load saved data from localStorage
    var description = localStorage.getItem(hour);

    var textAreaEl = $("<textarea>")
        .addClass("col-9 description col-lg-10")
        .attr("aria-label", "description")
        .attr("style", "color: black; font-size: 20px")
        .text(description);
    // Add aria-label attribute

    var button = $("<button>")
        .addClass("col-2 saveBtn col-lg-1")
        .attr("data-hour", hour)
        .attr("aria-label", "save button")
        .attr("style", "font-size: 40px")

    button.click(function () {
        // Get dataset hour value
        var logTime = $(this).attr("data-hour");
        var logText = $(this).siblings(".description").val();
        localStorage.setItem(logTime, logText);
        alert("Saved!")
        // Call modal dialog
    });

    var icon = $("<i>")
        .addClass("fas fa-save");

    button.append(icon);
    rowEl.append(hourEl, textAreaEl, button);
    return rowEl;
}


// Add update row function
function updateRow(row) {
    var currentHour = moment().hours();
    var rowHour = parseInt(row.attr("data-hour"));
    // Get the textarea element
    var textArea = row.children(".description");
    if (rowHour < currentHour) {
        textArea.addClass("past");
    } else if (rowHour === currentHour) {
        textArea.removeClass("past");
        textArea.addClass("present");
    } else {
        textArea.removeClass("present");
        textArea.addClass("future");
    }
}
// Create clear button row function
function clearButtonRow() {
    var rowEl = $("<div>")
        .addClass("row justify-content-center");

    var button = $("<button>")
        .addClass("col-4 btn border border-dark")
        .attr("aria-label", "clear button");

    var icon = $("<i>").addClass("fas fa-trash-alt");
    button.append(icon);
    rowEl.append(button);
    // Append clear button row to container
    $(".container").append(rowEl);

    // Add click event to clear button
    button.click(function () {
        localStorage.clear();
        location.reload();
    })

}

// Function for setting currentDay text with current date and time
function currentDay() {
    // current date
    var currentDay = moment().format("MMMM Do YYYY");
    // current time
    var currentTime = moment().format("h:mm:ss a");

    $("#currentDay").text(currentDay);
    $("#currentTime").text(currentTime);
}

// Add init function
function init() {

    for (var i = 9; i < 18; i++) {
        var rowEl = timeRow(i);
        $(".container").append(rowEl);

        updateRow(rowEl);
    }

    clearButtonRow();


    window.setInterval(function () {
        currentDay();

        $(".time-block").each(function () {
            updateRow($(this));
        })
    }, 1000);
}

$(document).ready(function () {
    init();
});