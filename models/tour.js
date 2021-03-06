"Use Strict";

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
        len: [1, 1000]
      }
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    URL: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
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
    Tour.belongsTo(models.User);
  };
  return Tour;
};
