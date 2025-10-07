'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('prodcolors', [
      { productId: 1, colorId: 2 },
      { productId: 1, colorId: 3 },
      { productId: 2, colorId: 2 },
      { productId: 2, colorId: 11 },
      { productId: 3, colorId: 1 },
      { productId: 3, colorId: 2 },
      { productId: 3, colorId: 3 },
      { productId: 4, colorId: 2 },
      { productId: 5, colorId: 1 },
      { productId: 5, colorId: 2 },
      { productId: 5, colorId: 3 },
      { productId: 6, colorId: 1 },
      { productId: 6, colorId: 2 },
      { productId: 7, colorId: 1 },
      { productId: 7, colorId: 2 },
      { productId: 7, colorId: 12 },
      { productId: 8, colorId: 1 },
      { productId: 8, colorId: 5 },
      { productId: 8, colorId: 9 },
      { productId: 9, colorId: 1 },
      { productId: 9, colorId: 2 },
      { productId: 10, colorId: 1 },
      { productId: 10, colorId: 2 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prodcolors', null, {});
  }
};
