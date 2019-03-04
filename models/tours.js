module.exports = function(sequelize, DataTypes) {
  var Tour = sequelize.define("Tour", {
    tile: DataTypes.STRING,
    description: DataTypes.TEXT,
    "number of stops": DataTypes.INTEGER,
    duration: DataTypes.TIME,
    tags: DataTypes.STRING
  });

  Tour.associate = function(models) {
    Tour.hasMany(models.Location);
  };

  return Tour;
};
