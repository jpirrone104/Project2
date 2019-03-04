module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
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
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Location.associate = function(models) {
    Location.belongsTo(models.Tour);
  };

  return Location;
};
