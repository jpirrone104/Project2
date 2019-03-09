'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', [{
      title: 'La Calombe',
      description: 'Trendy cafe serving house-brand artisanal coffee, pastries & snacks in a sleek space.',
      address: '1335 Frankford Ave', 
      TourId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  
    }
  ],
    {});
  }

  // down: (queryInterface, Sequelize) => {
  //   /*
  //     Add reverting commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkDelete('People', null, {});
  //   */
  // }
};
