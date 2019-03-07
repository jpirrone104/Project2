exports.returnArrayfromString = function(string) {
  try {
    var split = string.split(",");
    return split;
  } catch (error) {
    console.log(error);
  }
};

// Function takes in all available tours and returns an array of unique neighborhoods.
exports.returnAvailableNeighborhoods = function(tours) {
  try {
    var neighborhoods = [];
    for (var i = 0; i < tours.length; i++) {
      if (neighborhoods.indexOf(tours[i].dataValues.neighborhood) === -1) {
        neighborhoods.push(tours[i].dataValues.neighborhood);
      }
    }
    return neighborhoods;
  } catch (error) {
    console.log(error);
  }
};

// Function takes in all available tours and returns an array of unique tags.
exports.returnUniqueTags = function(tours) {
  try {
    var tags = [];
    for (var i = 0; i < tours.length; i++) {
      var tagsArr = tours[i].dataValues.tags.split(",");
      console.log(tagsArr);
      for (var j = 0; j < tagsArr.length; j++) {
        tagsArr.map(function(element) {
          var trimmed = element.toLowerCase().trim();
          if (!tags.includes(trimmed)) {
            tags.push(trimmed);
          }
        });
      }
    }
    return tags;
  } catch (error) {
    console.log(error);
  }
};
