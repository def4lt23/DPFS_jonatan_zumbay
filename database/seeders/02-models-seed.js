'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('models', [
      { id: 1, name: 'Sin Modelo' },
      { id: 2, name: 'Instrumentos Musicales' },
      { id: 3, name: 'Monumentos Historicos' },
      { id: 4, name: 'Kids' },
      { id: 5, name: 'Logos' },
      { id: 6, name: 'Bebidas' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('models', null, {});
  }
};
