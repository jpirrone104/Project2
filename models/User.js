module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Tour);
  };

  User.associate = function(models) {
    User.hasMany(models.Location);
  };

  return User;
};
