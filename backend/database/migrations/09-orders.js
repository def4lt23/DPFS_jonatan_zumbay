"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla orders
    await queryInterface.createTable("orders", {
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
          model: "users", // nombre de la tabla del carrito
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, //se crea solo
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: "pending",
        allowNull: false,
      },
    });
    // indice
    await queryInterface.addIndex("orders", ["userId"]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla orders
    await queryInterface.dropTable("orders");
  },
};
