"use strict";

module.exports = {
  async up(queryInterface, Sequelize) { // Crear la tabla
    await queryInterface.createTable("products", { // Definicion de columnas
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      modelId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "models", // nombre de la tabla referenciada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      size: {
        type: Sequelize.ENUM("Mediana", "Grande"),
        allowNull: false,
        defaultValue: "Mediana",
      },
      stock: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });

    // indices opcionales
    await queryInterface.addIndex("products", ["price"]); 
    await queryInterface.addIndex("products", ["featured"]);
    await queryInterface.addIndex("products", ["modelId"]);
  },

  async down(queryInterface, Sequelize) { // Revertir los cambios
    await queryInterface.dropTable("products");
  },
};
