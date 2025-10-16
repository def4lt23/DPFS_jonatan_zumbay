'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('colors', [
      { id: 1, name: 'Ninguno' },
      { id: 2, name: 'Blanco' },
      { id: 3, name: 'Negro' },
      { id: 4, name: 'Madera' },
      { id: 5, name: 'Azul' },
      { id: 6, name: 'Amarillo' },
      { id: 7, name: 'Rojo' },
      { id: 8, name: 'Verde' },
      { id: 9, name: 'Naranja' },
      { id: 10, name: 'Rosa' },
      { id: 11, name: 'Gris' },
      { id: 12, name: 'Marron' },
      { id: 13, name: 'Turquesa' },
      { id: 14, name: 'Rainbow' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
