$(document).ready(function() {
  $(document).on("click", ".tour-delete", handleDelete);

  // Function for handling what happens when the delete button is pressed.
  function handleDelete() {
    var tourId = $(this).data("id");
    var thisCard = $(this).closest(".row");
    thisCard.remove();

    $.ajax({
      method: "DELETE",
      url: "/api/tours/" + tourId
    }).then(function(data) {
      console.log(data);
    });
  }
});
