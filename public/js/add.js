// The API object contains methods for each kind of request we'll make
var API = {
  saveTour: function(tour) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tours",
      data: JSON.stringify(tour)
    });
  },
  getTours: function() {
    return $.ajax({
      url: "api/tours",
      type: "GET"
    });
  },
  deleteTours: function(id) {
    return $.ajax({
      url: "api/tours/" + id,
      type: "DELETE"
    });
  }
};

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

$("#submit-button").on("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  var creator = document.getElementById("tourcreator").value;
  var title = document.getElementById("tourtitle").value;
  var description = document.getElementById("tourdescription").value;
  var duration = parseInt(document.getElementById("tourduration").value);
  var numberOfStops = 0;

  // Grab and process neighborhood selection.
  var selections = document.getElementById("tourneighborhood");
  var neighborhood = selections.options[selections.selectedIndex].innerText;

  var URL = document.getElementById("tourimg").value;

  // Grab and process tags.
  var tagElements = document.getElementsByClassName("tag");
  var tags = "";
  for (var i = 0; i < tagElements.length; i++) {
    if (i === tagElements.length - 1) {
      tags += tagElements[i].value.toLowerCase().trim();
    } else {
      tags += tagElements[i].value.toLowerCase().trim() + ", ";
    }
  }

  // Grab and process all of our tour stops (derive number of stops from number of stops on page).
  var locationElements = document.getElementsByClassName("tourstop");
  numberOfStops = locationElements.length;
  var locations = [];
  for (var j = 0; j < locationElements.length; j++) {
    var children = locationElements[j].children;
    var thisLocation = {};
    for (var k = 0; k < children.length; k++) {
      console.log(children[k].classList.value);
      if (
        children[k].classList.value.includes("stoptitle") &&
        children[k].value
      ) {
        var stopTitle = children[k].value;
        thisLocation.title = stopTitle;
      }

      if (
        children[k].classList.value.includes("stopaddress") &&
        children[k].value
      ) {
        var stopAddress = children[k].value;
        thisLocation.address = stopAddress;
      }

      if (
        children[k].classList.value.includes("stopdescription") &&
        children[k].value
      ) {
        var stopDescription = children[k].value;
        thisLocation.description = stopDescription;
      }
    }
    locations.push(thisLocation);
  }

  // Capture our errors into an array (we'll render this on the page as a modal).
  var errors = [];

  // Run simple validation on the client side, pushing errors into the above array as we go.
  if (!creator) {
    errors.push("Missing tour creator");
  }

  if (!title) {
    errors.push(" Missing tour title");
  }

  if (!description) {
    errors.push(" Missing tour description");
  }

  if (!duration) {
    errors.push(" Missing tour duration");
  }

  if (!neighborhood || neighborhood === "Select Neighborhood") {
    errors.push(" Missing tour neighborhood");
  }

  if (!URL || !checkURL(URL)) {
    errors.push(" Missing proper image URL");
  }

  // Keep tabs on whether or not there are errors with the submit stop sections.
  var areStopErrors = false;
  for (var t = 0; t < locations.length; t++) {
    if (
      !locations[t].title ||
      !locations[t].address ||
      !locations[t].description
    ) {
      areStopErrors = true;
    }
  }

  if (areStopErrors) {
    errors.push(" Missing tour stop title, description, or address");
  }

  if (errors.length > 0) {
    alert("Please fix the following errors: \n" + errors);
  }

  var tour = {
    user: creator,
    title: title,
    description: description,
    neighborhood: neighborhood,
    URL: URL,
    numberOfStops: numberOfStops,
    duration: duration,
    tags: tags,
    locations: locations
  };

  console.log(tour);

  // This is our first POST request to the tour tables. It should return tour.
  API.saveTour(tour).then(function() {
    // Drop down displaying the add tour stop input fields.

    // We'll need to capture the tourId in this second POST request to the locations table.
    API.saveLocations(locations).then(function() {
      window.location.href = "/view-tours";
    });
  });
}

// Function that takes in a url and returns boolean whether it ends with the proper picture format.
function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
}
