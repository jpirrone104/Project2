'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // return queryInterface.removeColumn('Tours', 'URL')
       return queryInterface.addColumn(
          'locations',
          'ToursId',
            {
              type: Sequelize.TEXT,
              allowNull: false
            },
          'tours',
          'URL',
            {
              type: Sequelize.VARCHAR(1000),
              allowNull: false
            } 
       )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('locations', 'ToursId')
  }
 };
