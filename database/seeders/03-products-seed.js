'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        name: 'Lampara Guitarra',
        description: 'Lampara LED con forma de guitarra, ideal para amantes de la musica.',
        modelId: 2,
        price: 50001,
        size: 'Mediana',
        stock: 10,
        featured: true
      },
      {
        id: 2,
        name: 'Lampara Violin',
        description: 'Lampara decorativa con diseño de violin, perfecta para amantes de la musica clasica. Su silueta elegante aporta calidez y estilo a cualquier ambiente.',
        modelId: 2,
        price: 50002,
        size: 'Mediana',
        stock: 5,
        featured: false
      },
      {
        id: 3,
        name: 'Lampara Piano',
        description: 'Lampara con forma de piano de cola, ideal para musicos o ambientes artisticos. Combina iluminacion suave con un diseño armonioso y distinguido.',
        modelId: 2,
        price: 50003,
        size: 'Mediana',
        stock: 5,
        featured: false
      },
      {
        id: 4,
        name: 'Lampara Torre Eiffel',
        description: 'Lampara con diseño inspirado en la iconica Torre Eiffel de Paris. Un toque moderno y romantico para decorar habitaciones o escritorios.',
        modelId: 3,
        price: 50004,
        size: 'Grande',
        stock: 5,
        featured: false
      },
      {
        id: 5,
        name: 'Lampara Torre de Pisa',
        description: 'Diseño inclinado y original que representa la famosa Torre de Pisa. Una pieza unica que aporta historia y creatividad a tu espacio.',
        modelId: 3,
        price: 50005,
        size: 'Grande',
        stock: 5,
        featured: false
      },
      {
        id: 6,
        name: 'Lampara Obelisco Bs As',
        description: 'Lampara LED con la silueta del emblematico Obelisco porteño. Ideal para quienes aman la ciudad y quieren un detalle decorativo lleno de identidad.',
        modelId: 3,
        price: 50006,
        size: 'Grande',
        stock: 5,
        featured: false
      },
      {
        id: 7,
        name: 'Lampara Cohete Espacial',
        description: 'Lampara en forma de cohete, perfecta para cuartos infantiles o amantes del espacio. Un diseño divertido que enciende la imaginacion.',
        modelId: 4,
        price: 50007,
        size: 'Mediana',
        stock: 5,
        featured: false
      },
      {
        id: 8,
        name: 'Lampara Mariposa',
        description: 'Delicada lampara con diseño de mariposa, ideal para crear un ambiente relajado y natural. Perfecta para dormitorios o espacios creativos.',
        modelId: 4,
        price: 50008,
        size: 'Mediana',
        stock: 5,
        featured: false
      },
      {
        id: 9,
        name: 'Lampara Python',
        description: 'Lampara LED con el logo de Python, ideal para programadores y entusiastas del desarrollo. Un detalle geek para tu escritorio.',
        modelId: 5,
        price: 50009,
        size: 'Mediana',
        stock: 5,
        featured: false
      },
      {
        id: 10,
        name: 'Lampara Fernet',
        description: 'Lampara con la iconica botella de Fernet, ideal para bares, cocinas o fans de esta bebida clasica. Un toque divertido y original para decorar.',
        modelId: 6,
        price: 50010,
        size: 'Grande',
        stock: 5,
        featured: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};