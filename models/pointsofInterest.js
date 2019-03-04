module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    tile: DataTypes.STRING,
    description: DataTypes.TEXT,
    neighborhood: DataTypes.STRING
  });
  return Location;
};
