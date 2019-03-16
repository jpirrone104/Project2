"Use Strict";

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    title: {
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
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Location.associate = function(models) {
    Location.belongsTo(models.Tour, {
      onDelete: "cascade"
    });
  };

  return Location;
};
