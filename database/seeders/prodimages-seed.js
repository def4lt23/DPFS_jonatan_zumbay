'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('prodimages', [
      { productId: 1, url: "lamp1a.png" },
      { productId: 1, url: "lamp1b.png" },
      { productId: 1, url: "lamp1c.png" },
      { productId: 2, url: "lamp2a.png" },
      { productId: 2, url: "lamp2b.png" },
      { productId: 2, url: "lamp2c.png" },
      { productId: 3, url: "lamp3a.png" },
      { productId: 3, url: "lamp3b.png" },
      { productId: 3, url: "lamp3c.png" },
      { productId: 4, url: "lamp4a.png" },
      { productId: 4, url: "lamp4b.png" },
      { productId: 4, url: "lamp4c.png" },
      { productId: 5, url: "lamp5a.png" },
      { productId: 5, url: "lamp5b.png" },
      { productId: 5, url: "lamp5c.png" },
      { productId: 6, url: "lamp6a.png" },
      { productId: 6, url: "lamp6b.png" },
      { productId: 6, url: "lamp6c.png" },
      { productId: 7, url: "lamp7a.png" },
      { productId: 7, url: "lamp7b.png" },
      { productId: 7, url: "lamp7c.png" },
      { productId: 8, url: "lamp8a.png" },
      { productId: 8, url: "lamp8b.png" },
      { productId: 9, url: "lamp9a.png" },
      { productId: 9, url: "lamp9b.png" },
      { productId: 9, url: "lamp9c.png" },
      { productId: 10, url: "lamp10a.png" },
      { productId: 10, url: "lamp10b.png" },
      { productId: 10, url: "lamp10c.png" },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prodimages', null, {});
  }
};
