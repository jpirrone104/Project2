'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // return queryInterface.removeColumn('Tours', 'URL')
    return queryInterface.addColumn(
      // 'Users',
      // 'password',
      // {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('locations', 'ToursId')
  }
};
