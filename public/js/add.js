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
  getUserId: function() {
    return $.ajax({
      type: "GET",
      url: "api/user_data"
    });
  }
};

// Object for keeping tabs on basic info regarding the current user.
var thisUser = {
  id: null,
  name: "",
  setUserData: function(id, name) {
    this.id = id;
    this.name = name;
  },
  getUserId: function() {
    return this.id;
  },
  getUserName: function() {
    return this.name;
  }
};

// Object for keeping tabs on the current tour we're working with.
var thisTour = {
  id: 0,
  setId: function(id) {
    this.id = id;
  },
  getId: function() {
    return this.id;
  }
};

// IIF for grabbing and setting basic user information.
$(document).ready(function() {
  $.get("api/user_data").then(function(userdata) {
    thisUser.setUserData(userdata.id, userdata.name);
    // console.log("HERE IS THE USER ID:" + thisUser.getUserId());
  });
});

// If the user wants to add another stop to the route, generate a blank input field.
$(document).on("click", "#add-stop-button", function() {
  var submitButton = $("#submit-locations");
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

// Handle POST requests when user clicks on the submit buttons.
$("#submit-tour").on("click", createTour);
$("#submit-locations").on("click", addTourLocations);

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
    Users: thisUser.getUserId(),
    title: title,
    description: description,
    neighborhood: neighborhood,
    URL: URL,
    duration: duration,
    tags: tags
  };

  console.log(tour);

  if (!errors.length) {
    // Post our tour to the Tours table, then reveal the form and set our local tour object.
    API.saveTour(tour).then(function(tour) {
      document.getElementById("submit-tour").remove();
      document.getElementById("tourstopssection").style.display = "block";
      thisTour.setId(tour.id);
    });
  }
}

// Function takes in the newly created tour object, grabs DOM values for each.
function addTourLocations(e) {
  e.preventDefault();
  // Grab and process all of our tour stops.
  var locationElements = document.getElementsByClassName("tourstop");
  // var placeSearch, autocomplete;
  // function initAutocomplete() {
  //   // Create the autocomplete object, restricting the search predictions to
  //   // geographical location types.
  //   autocomplete = new google.maps.places.Autocomplete(
  //       document.getElementById('autocomplete'), {types: ['geocode']});
  //   // Avoid paying for data that you don't need by restricting the set of
  //   // place fields that are returned to just the address components.
  //   autocomplete.setFields('address_components');
  //   // When the user selects an address from the drop-down, populate the
  //   // address fields in the form.
  //   autocomplete.addListener('place_changed', fillInAddress);
  // }
  // function fillInAddress() {
  //   // Get the place details from the autocomplete object.
  //   var place = autocomplete.getPlace();
  //   for (var component in componentForm) {
  //     document.getElementById(component).value = '';
  //     document.getElementById(component).disabled = false;
  //   }
  // }  
  // initAutocomplete()
  var areStopErrors = false;
  var locations = [];

  // Loop over every location element on the DOM.
  for (var j = 0; j < locationElements.length; j++) {
    var children = locationElements[j].children;

    // Initialize this location with the tour id; we'll pass in data...
    var thisLocation = {
      TourId: thisTour.getId()
    };

    // ... by looping over the DOM children and grabbing their form values.
    for (var k = 0; k < children.length; k++) {
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

    // Push this location into our locations array.
    locations.push(thisLocation);

    for (var t = 0; t < locations.length; t++) {
      if (
        !locations[t].title ||
        !locations[t].address ||
        !locations[t].description
      ) {
        areStopErrors = true;
      }
    }
  }

  if (areStopErrors) {
    alert(
      "You're missing a tour stop title, description, or address along the way."
    );
  } else {
    API.saveLocations(locations).then(function(data) {
      if (data) {
        console.log("success! posted locations.");
        window.location.href = "/view-tours";
      } else {
        alert("Something went wrong. Try again!");
      }
    });
  }
}

// Function that takes in a url and returns boolean whether it ends with the proper picture format.
function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
}
