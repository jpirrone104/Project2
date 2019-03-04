module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    tile: DataTypes.STRING,
    description: DataTypes.TEXT,
    neighborhood: DataTypes.STRING
  });

  Location.associate = function(models) {
    Location.belongsTo(models.Tour);
  };

  return Location;
};
