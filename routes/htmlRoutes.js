//var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", { layout: "landing" });
  });

  app.get("/view-tours", isAuthenticated, function(req, res) {
    res.render("view-tours");
  });

  app.get("/add", isAuthenticated, function(req, res) {
    res.render("add");
  });

  app.get("/tour/:id", isAuthenticated, function(req, res) {
    // var id = req.params.id;
    res.render("tour");
  });
  app.get("/signup", function(req, res) {
    res.render("signup");
  });
  app.get("/login", function(req, res) {
    res.render("login");
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
