$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Store the related description and time into local storage, when 'saveBtn' is clicked,
  $(".saveBtn").on("click", function () {
    var time = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(time, userInput); // save the user input in ocal storage
  });


  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Gets current hour
  var currentHour = dayjs().hour();

  // Select all HTML elements with the class 'time-block'
  $(".time-block").each(function () {
    // Extract the hour from the 'id' attribute of the current element and convert it into an integer
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Check if the hour of the block and add or remove the past, present, and future classes
    if (blockHour < currentHour) {
      $(this).removeClass("future");
      $(this).removeClass("present");
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).removeClass("future");
      $(this).addClass("present");
    } else {
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");
    }
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  

  
  // Retrieve and set the values from local storage for each hour's description field
  $(".time-block").each(function () {
    var time = $(this).attr("id");
    var savedInput = localStorage.getItem(time);
    if (savedInput) {
      $(this).find(".description").val(savedInput);
    }
  });

  // Display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
