'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('prodimages', [
      { productId: 1, name: "lamp1a.png" },
      { productId: 1, name: "lamp1b.png" },
      { productId: 1, name: "lamp1c.png" },
      { productId: 2, name: "lamp2a.png" },
      { productId: 2, name: "lamp2b.png" },
      { productId: 2, name: "lamp2c.png" },
      { productId: 3, name: "lamp3a.png" },
      { productId: 3, name: "lamp3b.png" },
      { productId: 3, name: "lamp3c.png" },
      { productId: 4, name: "lamp4a.png" },
      { productId: 4, name: "lamp4b.png" },
      { productId: 4, name: "lamp4c.png" },
      { productId: 5, name: "lamp5a.png" },
      { productId: 5, name: "lamp5b.png" },
      { productId: 5, name: "lamp5c.png" },
      { productId: 6, name: "lamp6a.png" },
      { productId: 6, name: "lamp6b.png" },
      { productId: 6, name: "lamp6c.png" },
      { productId: 7, name: "lamp7a.png" },
      { productId: 7, name: "lamp7b.png" },
      { productId: 7, name: "lamp7c.png" },
      { productId: 8, name: "lamp8a.png" },
      { productId: 8, name: "lamp8b.png" },
      { productId: 9, name: "lamp9a.png" },
      { productId: 9, name: "lamp9b.png" },
      { productId: 9, name: "lamp9c.png" },
      { productId: 10, name: "lamp10a.png" },
      { productId: 10, name: "lamp10b.png" },
      { productId: 10, name: "lamp10c.png" },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prodimages', null, {});
  }
};
