var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/view-tours");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    // console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
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
  app.post("/api/locations", function(req, res) {
    db.Location.bulkCreate(req.body).then(function(locations) {
      res.json(locations);
    });
  });

  // Get all of our tour locations.
  app.get("/api/locations", function(req, res) {
    db.Location.findAll({}).then(function(locations) {
      res.json(locations);
    });
  });

  // Delete a tour by id.
  app.delete("/api/tours/:id", function(req, res) {
    db.Tour.destroy({
      where: { id: req.params.id }
    }).then(function(tour) {
      res.json(tour);
    });
  });
};
