"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla colors
    await queryInterface.createTable("colors", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, //no puede ser nulo
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true, //evito colores repetidos en nombre
      },
    });

    //indices para optimizar busquedas
    await queryInterface.addIndex("colors", ["name"]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla colors
    await queryInterface.dropTable("colors");
  },
};
