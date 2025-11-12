"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("models", {
      // Definicion de columnas
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // no puede ser nulo
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    });

    // indices opcionales
    await queryInterface.addIndex("models", ["name"]);
  },

  async down(queryInterface, Sequelize) {
    // Revertir los cambios
    await queryInterface.dropTable("models");
  },
};
