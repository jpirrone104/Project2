var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

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

  app.get("/add", isAuthenticated, function(req, res) {
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
      res.render("browse-neighborhoods", {
        tours: tours,
        neighborhood: req.params.neighborhood
      });
    });
  });

  app.get("/browse/tags/:tag", function(req, res) {
    db.Tour.findAll({
      where: {
        tags: {
          $like: "%" + req.params.tag + "%"
        }
      }
    }).then(function(tours) {
      res.render("browse-tags", {
        tours: tours,
        tag: req.params.tag
      });
    });
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
