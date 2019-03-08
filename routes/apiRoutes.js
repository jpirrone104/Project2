var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tours", function(req, res) {
    db.Tour.findAll({}).then(function(tours) {
      res.json(tours);
    });
  });

  // Create a new example
  app.post("/api/tours", function(req, res) {
    db.Tour.create(req.body).then(function(tour) {
      res.json(tour);
    });
  });

  // Delete an example by id
  //   app.delete("/api/examples/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });
};
