'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
       return queryInterface.addColumn(
        user.associate = function (models) {
          user.hasMany(models.Tour);
        });
       },
      

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tour', 'Users')
  }
 };
