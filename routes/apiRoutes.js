var db = require("../models");

module.exports = function(app) {
  // Get all available tours.
  app.get("/api/tours", function(req, res) {
    db.Tour.findAll({}).then(function(tours) {
      res.json(tours);
    });
  });

  // Post a new tour in the database.
  app.post("/api/tours", function(req, res) {
    db.Tour.create(req.body).then(function(tour) {
      res.json(tour);
    });
  });

  // Post a new set of locations associated with a tour.
  app.post("/api/tours", function(req, res) {
    console.log(req.body);
    db.Tour.bulkCreate(req.body).then(function(tour) {
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
