// If the user wants to add another stop to the route, generate a blank input field.
$(document).on("click", "#add-stop-button", function() {
  var submitButton = $("#submit-button");
  var addStop = $(".tour-stop:last");

  // Clone the new stop input and clear contents of previous entry.
  var newStop = addStop.clone();
  newStop.children(".stop-title").val("");
  newStop.children(".stop-address").val("");
  newStop.children(".stop-description").val("");

  // Insert new stop before the submit button, then destroy the previous button.
  newStop.insertBefore(submitButton);
  $(this).remove();
});

$("#submit-button").on("click", function(e) {
  e.preventDefault();
  console.log($("#add-tour-form"));
});
