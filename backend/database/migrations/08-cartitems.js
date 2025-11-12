"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla cartitems
    await queryInterface.createTable("cartitems", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cartId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "carts", // nombre de la tabla del carrito
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
    });
    // indices
    await queryInterface.addIndex("cartitems", ["cartId"]);
    await queryInterface.addIndex("cartitems", ["productId"]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla cartitems
    await queryInterface.dropTable("cartitems");
  },
};
