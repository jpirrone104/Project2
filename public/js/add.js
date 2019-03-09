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
  saveLocations: function(locations) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/locations",
      data: JSON.stringify(locations)
    });
  },
  getTours: function() {
    return $.ajax({
      url: "api/tours",
      type: "GET"
    });
  }
};

// If the user wants to add another stop to the route, generate a blank input field.
$(document).on("click", "#add-stop-button", function() {
  var submitButton = $("#submit-button");
  var addStop = $(".tourstop:last");

  // Clone the new stop input and clear contents of previous entry.
  var newStop = addStop.clone();
  newStop.children(".stoptitle").val("");
  newStop.children(".stopaddress").val("");
  newStop.children(".stopdescription").val("");

  // Insert new stop before the submit button, then destroy the previous button.
  newStop.insertBefore(submitButton);
  $(this).remove();
});

// Handle POST/GET requests when user clicks on the submit buttons.
$("#submit-tour").on("click", createTour);
$("submit-locations").on("click", addTourLocations);

// Grab DOM values for our tour, package them into an object, and POST to api/tours.
function createTour(e) {
  e.preventDefault();

  var creator = document.getElementById("tourcreator").value;
  var title = document.getElementById("tourtitle").value;
  var description = document.getElementById("tourdescription").value;
  var duration = parseInt(document.getElementById("tourduration").value);

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

  if (errors.length > 0) {
    alert("Please fix the following errors: \n" + errors);
  }

  var tour = {
    user: creator,
    title: title,
    description: description,
    neighborhood: neighborhood,
    URL: URL,
    duration: duration,
    tags: tags
  };

  // This is our first POST request to the tour tables. It should return tour.
  API.saveTour(tour).then(function(tour) {
    revealLocationForm();
    addTourLocations(tour);
  });
  // Drop down displaying the add tour stop input fields.

  // Call function that grabs values from stops and then sends POST request to api/locations.

  //   // We'll need to capture the tourId in this second POST request to the locations table.
  //   API.saveLocations(locations).then(function() {
  //     window.location.href = "/view-tours";
  //   });
  // });
}

// Function takes in the newly created tour object, grabs DOM values for each.
function addTourLocations(tour) {
  // Grab and process all of our tour stops (derive number of stops from number of stops on page).
  var locationElements = document.getElementsByClassName("tourstop");
  var locations = [];
  for (var j = 0; j < locationElements.length; j++) {
    var children = locationElements[j].children;
    // Initialize our location object with the tour id; we'll pass in specific user data next...
    var thisLocation = {
      TourId: tour.id
    };
    // ... by looping over the DOM children and grabbing their values.
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

    // Keep tabs on whether or not there are errors with the submit tour locations array.
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
  }

  API.saveLocations(locations).then(function(data) {
    if (data) {
      window.location.href = "/view-tours";
    } else {
      alert("Something went wrong. Try again!");
    }
  });
}

function revealLocationForm() {
  $("#tourstopsection").toggle("slide");
}

// Function that takes in a url and returns boolean whether it ends with the proper picture format.
function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
}
