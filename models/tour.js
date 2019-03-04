module.exports = function(sequelize, DataTypes) {
  var Tour = sequelize.define("Tour", {
    tile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [500]
      }
    },
    "number of stops": DataTypes.INTEGER,
    duration: DataTypes.TIME,
    tags: DataTypes.STRING
  });

  Tour.associate = function(models) {
    Tour.hasMany(models.Location);
  };

  return Tour;
};
