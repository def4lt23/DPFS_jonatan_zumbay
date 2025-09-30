'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('colors', [
      { name: 'Ninguno' },
      { name: 'Blanco' },
      { name: 'Negro' },
      { name: 'Madera' },
      { name: 'Azul' },
      { name: 'Amarillo' },
      { name: 'Rojo' },
      { name: 'Verde' },
      { name: 'Naranja' },
      { name: 'Rosa' },
      { name: 'Gris' },
      { name: 'Marron' },
      { name: 'Turquesa' },
      { name: 'Rainbow' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
