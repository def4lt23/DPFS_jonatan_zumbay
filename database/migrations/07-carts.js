"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla carts
    await queryInterface.createTable("carts", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users", // FK nombre de la tabla del carrito
          key: "id",
        },
        onUpdate: "CASCADE", // Si por alguna razon el id del usuario cambia, actualizar en cascada
        onDelete: "CASCADE", // Si el usuario se elimina, eliminar el carrito
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, //se crea solo
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla carts
    await queryInterface.dropTable("carts");
  },
};
