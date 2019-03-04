module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Tour);
  };

  User.associate = function(models) {
    User.hasMany(models.Location);
  };

  return Location;
};
