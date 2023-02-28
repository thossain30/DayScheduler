// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(
  $(function () {
    // Gets date in form of {Day name}, {Full month name} {day}
    let dayJSobject = dayjs().format("dddd, MMMM D");
    // Gets the current hour of the day
    let hour = dayjs().hour();

    $(".saveBtn").on("click", function() {
      // grabs the text input box that is the sibling of the save button
      let text = $(this).siblings(".description").val();
      // grabs the id of the time block that is the parent of this button 
      let time = $(this).parent().attr("id");
      console.log("ID getting stored: " + time);

      // Saves anything that we input in the text box to the parent ID of the save button
      localStorage.setItem(time, text);
    })

    // Selects all the time blocks
    let timeBlocks = $(".px-5").children();

    function timeTracker() {
      // For each time block...
      timeBlocks.each(function() {
        // Grabs the ID for the time block i.e. hour-9, hour-10
        let blockID = this.id;
        // Gets the hour int from the id i.e. 9 from hour-9, 10 from hour-10
        let blockHour = blockID.match(/\d+/);

        // Only applies to 1pm to 5pm and increments them by 12 so that they are accurate on a 24-hour format
        if (blockHour < 9) {blockHour = parseInt(blockHour) + 12}
        /* 
          Compares the blockhour to the current hour (which is in 24-hour format)
          And adds past present and future classes to the time block as necessary
        */
        if (blockHour > hour) {
          $(this).addClass("future");
          $(this).removeClass("present");
          $(this).removeClass("past");
        } else if (blockHour < hour) {
          $(this).addClass("past");
          $(this).removeClass("present");
          $(this).removeClass("future");
        } else {
          $(this).addClass("present");
          $(this).removeClass("future");
          $(this).removeClass("past");
        }
      });
    }

    // Retrieves items from Local Storage and displays it on the time blocks as necessary
    $("#hour-9 .description").val(localStorage.getItem("hour-9"));
    $("#hour-10 .description").val(localStorage.getItem("hour-10"));
    $("#hour-11 .description").val(localStorage.getItem("hour-11"));
    $("#hour-12 .description").val(localStorage.getItem("hour-12"));
    $("#hour-1 .description").val(localStorage.getItem("hour-1"));
    $("#hour-2 .description").val(localStorage.getItem("hour-2"));
    $("#hour-3 .description").val(localStorage.getItem("hour-3"));
    $("#hour-4 .description").val(localStorage.getItem("hour-4"));
    $("#hour-5 .description").val(localStorage.getItem("hour-5"));

    // Displays the current date in the header of the page
    $("#currentDay").text(dayJSobject + "th");

    timeTracker();
  })
)