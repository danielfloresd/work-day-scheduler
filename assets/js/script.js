// Define currentHour24 outside of the function so it can be used in the saveEvent function
var currentHour24 = moment().format("H");
// Define function to create an hourly calendar using the moment.js library

function createCalendar() {
    // Get the current date and time
    var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    // Get the current hour
    var currentHour = moment().format("h");
    // Get the current hour in 24 hour format
    var currentHour24 = moment().format("H");
    // Get the current minute
    var currentMinute = moment().format("mm");
    // Get the current second
    var currentSecond = moment().format("ss");
    // Display the current date and time in the header
    $("#currentDay").text(currentDate);
    // Set the current time in seconds
    var currentTime = moment().format("HH:mm:ss");
    // Loop over time blocks

    // Set the timer to update the time every second
    var timer = setInterval(function () {
        // Get the current time

        currentTime = moment().format("HH:mm:ss");
        // Get the current hour 24 hour format
        currentHour24 = 12;//moment().format("H");

        var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        // Update the current time in the header
        $("#currentDay").text(currentDate);
        // Check if the current time matches the time of any time block
        $(".time-block").each(function () {
            // Get the block's hour using the data-hour attribute
            var blockHour = parseInt($(this).attr("data-hour"));
            // Check if the time blocks and current time match
            // console.log(blockHour + " current hour " + currentHour24);
            if (blockHour == currentHour24) {
                // Add the class "present" to the matching time block
                $(this).removeClass("past");
                $(this).addClass("present");
                // Add class preset to textarea
                $(this).children(".text-area").addClass("present");
                // Set rowColor to "present"
                rowColor = "present";
            } else if (blockHour < currentHour24) {
                // Add the class "past" to the matching time block
                $(this).addClass("past");
                // Add past class to textarea
                $(this).children(".text-area").addClass("past");
                // Set rowColor to "past"
                // Make text area read only
                $(this).children().attr("readonly", true);
                rowColor = "past";
            } else {
                // Add the class "future" to the matching time block
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
                // Add future class to textarea
                $(this).children(".text-area").addClass("future");
                // Set rowColor to "future"
                rowColor = "future";
            }
        })
    }, 1000);
}

//Create function to create time block table rows for the calendar
function createRow(hour) {
    // Create a time block row
    var timeRow = $("<tr>").attr({
        "class": "table-row"
    });

    // Create a table data element for the time row
    hourText = moment(hour, "H").format("h a").toUpperCase();
    var timeField = $("<td>")
        .text(hourText) // Set the text of the time field to the hour
        .attr({
            "class": "col-1 hour" // Add the class "hour" to the time field
        });
    // timeField.attr("data-hour", hour);
    // Create a table data element for the event row
    var eventField = $("<td>").attr({
        "class": "time-block"

    });
    eventField.attr("data-hour", hour);
    // Create a textarea element for the event row
    var eventArea = $("<input>").attr({
        "class": "text-area description col-8"
    });

    // Add click listener to textarea
    eventArea.on("click", function () {

        // If window is small
        if ($(window).width() < 821) {
            //Get hour from parent element
            var hour = $(this).parent().attr("data-hour");
            //Call window prompt to get text
            var text = window.prompt("Enter event for " + hourText);
            //Save event to local storage
            saveEvent(hour, text);
            //Load events from local storage
            loadEvents();
        }
        return;

    });

    // Add enter key event listener to the textarea
    eventArea.on("keyup", function (event) {
        // Check if the enter key was pressed
        console.log(event);
        if (event.key == "Enter") {
            // Get the value of the textarea
            var eventText = $(this).val();
            // Get the hour of the textarea
            var eventHour = $(this).parent().attr("data-hour");
            // Save the event to local storage
            console.log(eventHour + " " + eventText);
            saveEvent(eventHour, eventText);
            // Move to the next textarea
            $(this).parent().next().children().focus();
            // Move cursor out of textarea
            $(this).blur();
        }
    });
    // Create a table data element for the save button row
    // var saveField = $("<div>")
    //     .attr({
    //         "class": "col-md-1 saveBtn p-0"
    //     });
    // Create a save button element for the save button row
    // var saveBtn = $("<i class='far fa-save fa-lg'></i>");
    // Append the timeField, eventField, and saveField to the timeRow
    // Append the eventArea to the eventField
    eventField.append(eventArea);

    timeRow.append(timeField);
    timeRow.append(eventField);
    // Append the saveBtn to the saveField
    // saveField.append(saveBtn);
    // Return the timeRow
    return timeRow;
}


// // Create function to create time block rows for the calendar
// function createRow(timeBlockHour) {
//     // Create a row for each hour of the work day
//     var timeDiv = $("<div>");
//     timeDiv.addClass("row time-block");
//     timeDiv.attr("data-hour", timeBlockHour);
//     // Add data-hour attribute to the row
//     // Create a column for the hour
//     var hourCol = $("<div>");
//     hourCol.addClass("col-md-1 hour");
//     // Add the hour to the hour column
//     var hour = timeBlockHour;
//     // Convert the hour to a 12 hour format using moment.js
//     hour = moment(hour, "H").format("h a").toUpperCase();
//     // Add the hour to the hour column
//     hourCol.text(hour);
//     // Create a column for the event
//     var eventCol = $("<div>");
//     eventCol.addClass("col-md-10 description");
//     // Create a textarea for the event
//     var eventInput = $("<textarea>");
//     // Add classes to the textarea
//     eventInput.addClass("description col-10");
//     // Add the textarea to the event column
//     eventCol.append(eventInput);
//     // // Create a column for the save button
//     // var saveCol = $("<div>");
//     // saveCol.addClass("col-md-1 saveBtn");
//     // // Create the save button
//     // var saveBtn = $("<i>");
//     // saveBtn.addClass("far fa-save");
//     // // Append the columns to the row
//     // saveCol.append(saveBtn);
//     // Add event listener for save button
// // $(".saveBtn").on("click", saveEvent);   
//     timeDiv.append(hourCol, eventCol);
//     // Append the row to the container
//     $(".container").append(timeDiv);
// }

// Create a function to create rows for each hour of the work day
function createRows() {
    // Loop over the hours of the work day
    console.log("create rows");
    for (var i = 9; i < 18; i++) {
        // Create a row for each hour of the work day
        var row = createRow(i);
        console.log("row", row);
        $(".container").append(row);

    }
}

// Create a function to save the event to local storage
function saveEvent(hour, text) {
    // Save the event to local storage
    localStorage.setItem(hour, text);
}

// Create a function to load any saved events from local storage
function loadEvents() {
    // Loop over the time blocks
    $(".time-block").each(function () {
        // Get the hour from the time block
        var blockHour = $(this).attr("data-hour");
        // Get the saved event from local storage
        var eventText = localStorage.getItem(blockHour);
        // log the saved event to the console
        console.log("----" + blockHour + " " + eventText);
        // If there is an event in local storage for this hour
        if (eventText !== null) {
            // Set the value of the textarea to the event text
            $(this).children(".text-area").val(eventText);
        }
    }
    )
}

// Create init function to initialize the calendar
function init() {
    // Create the rows for the calendar
    createRows();
    // Create the calendar
    createCalendar();
    // Get the saved events from local storage
    loadEvents();
}


// Add init function to the document ready function
$(document).ready(function () {
    init();
})