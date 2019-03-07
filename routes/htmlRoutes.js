var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", { layout: "landing" });
  });

  // Load all available tours from the database.
  app.get("/view-tours", function(req, res) {
    db.Tour.findAll({}).then(function(tours) {
      res.render("view-tours", {
        tours: tours
      });
    });
  });

  app.get("/add", function(req, res) {
    res.render("add");
  });

  app.get("/tour/:id", function(req, res) {
    db.Tour.findOne({
      where: { id: req.params.id },
      include: [db.Location]
    }).then(function(tour) {
      res.render("tour", {
        tour: tour
      });
    });
  });

  app.get("/browse", function(req, res) {
    db.Tour.findAll({}).then(function(tours) {
      res.render("browse", {
        tours: tours
      });
    });
  });

  app.get("/browse/:neighborhood", function(req, res) {
    db.Tour.findAll({
      where: {
        neighborhood: req.params.neighborhood
      }
    }).then(function(tours) {
      res.render("view-tours", {
        tours: tours
      });
    });
  });

  //   app.get("/", function(req, res) {
  //     db.Example.findAll({}).then(function(dbExamples) {
  //       res.render("index", {
  //         msg: "Welcome!",
  //         examples: dbExamples
  //       });
  //     });
  //   });

  // Load example page and pass in an example by id
  //   app.get("/example/:id", function(req, res) {
  //     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //       res.render("example", {
  //         example: dbExample
  //       });
  //     });
  //   });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
