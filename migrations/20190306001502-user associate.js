'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
       return queryInterface.addColumn(
        User.associate = function (models) {
          User.hasMany(models.Tour);
        });
       },
      

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tours', 'Users')
  }
 };
