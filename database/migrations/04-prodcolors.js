"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla prodcolors
    await queryInterface.createTable("prodcolors", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // no puede ser nulo
      },
      productId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products", // FK hacia tabla products
          key: "id",
        },
        onUpdate: "CASCADE", //si se actualiza un id en products, se actualiza aqui
        onDelete: "CASCADE", //si se borra un producto, se borran los registros relacionados
      },
      colorId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "colors", // FK hacia tabla colors
          key: "id",
        },
        onUpdate: "CASCADE", //si se actualiza un id en colors, se actualiza aqui
        onDelete: "CASCADE", //si se borra un color, se borran los registros relacionados
      },
    });

    // indices individuales 
    await queryInterface.addIndex("prodcolors", ["productId"]);
    await queryInterface.addIndex("prodcolors", ["colorId"]);

    // indice compuesto para evitar duplicados y optimizar búsquedas
    await queryInterface.addIndex("prodcolors", ["productId", "colorId"], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla prodcolors
    await queryInterface.dropTable("prodcolors");
  },
};
