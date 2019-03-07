exports.returnArrayfromString = function(string) {
  try {
    var split = string.split(",");
    return split;
  } catch (error) {
    console.log(error);
  }
};

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
