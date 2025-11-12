"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla prodimages
    await queryInterface.createTable("prodimages", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // Asegurarse de que no sea nulo
      },
      productId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products", // nombre exacto de la tabla FK
          key: "id",
        },
        onUpdate: "CASCADE", // si se actualiza el producto, actualiza sus imagenes
        onDelete: "CASCADE", // si se borra el producto, borra sus imagenes
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
    // indice sobre productId
    await queryInterface.addIndex("prodimages", ["productId"]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla prodimages
    await queryInterface.dropTable("prodimages");
  },
};
