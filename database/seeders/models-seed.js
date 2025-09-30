'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('models', [
      { name: 'Sin Modelo' },
      { name: 'Instrumentos Musicales' },
      { name: 'Monumentos Historicos' },
      { name: 'Kids' },
      { name: 'Logos' },
      { name: 'Bebidas' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('models', null, {});
  }
};
