"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla orderdetails
    await queryInterface.createTable("orderdetails", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "orders", // nombre de la tabla de ordenes
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products", // nombre de la tabla de productos
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });

    //indices
    await queryInterface.addIndex("orderdetails", ["orderId"]);
    await queryInterface.addIndex("orderdetails", ["productId"]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla orderdetails
    await queryInterface.dropTable("orderdetails");
  },
};
