'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('prodcolors', [
      { productId: 1, colorId: 2 },
      { productId: 1, colorId: 3 },
      { productId: 2, colorId: 2 },
      { productId: 2, colorId: 11 },
      { productId: 3, colorId: 2 },
      { productId: 3, colorId: 3 },
      { productId: 3, colorId: 4 },
      { productId: 4, colorId: 2 },
      { productId: 5, colorId: 2 },
      { productId: 5, colorId: 3 },
      { productId: 5, colorId: 4 },
      { productId: 6, colorId: 2 },
      { productId: 6, colorId: 3 },
      { productId: 7, colorId: 2 },
      { productId: 7, colorId: 3 },
      { productId: 7, colorId: 13 },
      { productId: 8, colorId: 2 },
      { productId: 8, colorId: 6 },
      { productId: 8, colorId: 10 },
      { productId: 9, colorId: 2 },
      { productId: 9, colorId: 3 },
      { productId: 10, colorId: 2 },
      { productId: 10, colorId: 3 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prodcolors', null, {});
  }
};
