module.exports = function(sequelize, DataTypes) {
  var Tour = sequelize.define("Tour", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1000]
      }
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberOfStops: DataTypes.INTEGER,
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tags: DataTypes.STRING
  });

  Tour.associate = function(models) {
    Tour.hasMany(models.Location);
  };

  return Tour;
};
