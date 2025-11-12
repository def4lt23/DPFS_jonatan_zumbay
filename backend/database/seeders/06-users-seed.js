'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Jonatan',
        lastname: 'Zumbay',
        email: 'jonatan@gmail.com',
        username: 'Jone',
        password: '$2b$10$UZBpdasT422Vf8G.1kIViewdk6uMhFqpILq0pWH4ZcXpN9iihy7ne',
        numberphone: '789456123',
        address: 'belgrano 19',
        role: 'admin', // ENUM('admin', 'client')
        avatar: 'avatar-1758144923748.png',
        registerday: '2025-10-06 22:00:00'
      },
      {
        id: 2,
        name: 'Michael',
        lastname: 'Kaiser',
        email: 'kaiser@gmail.com',
        username: 'Emperador',
        password: '$2b$10$AaGocVqmRhXY7xBV3jX.0uuaiQy8b7vqLQt4w46Wrwc22ILjjiBAm',
        numberphone: '3885123456',
        address: 'Sala de la Primera Selección, Edificio 5, Japón',
        role: 'admin',
        avatar: 'avatar-1758144857283.png',
        registerday: '2025-10-06 22:00:00'
      },
      {
        id: 3,
        name: 'Giyu',
        lastname: 'Tomioka',
        email: 'giyu@gmail.com',
        username: 'Giyu__',
        password: '$2b$10$AmSYDHWYdAvoB3I6AvkZs.mduL1BFRL4J/adcv5ontTYZnm3xw.sC',
        numberphone: '3884123456',
        address: 'Finca del Agua, Sede del Cuerpo de Exterminio de Demonios, Japón',
        role: 'client',
        avatar: 'avatar-1758145101412.png',
        registerday: '2025-10-06 22:00:00'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
