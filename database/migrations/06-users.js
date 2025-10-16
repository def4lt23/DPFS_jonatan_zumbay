"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla users
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // no puede ser nulo
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      numberphone: {
        type: Sequelize.STRING(20),
        validate: {
          isNumeric: true,
        },
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("admin", "client"),
        allowNull: false,
        defaultValue: "client",
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      registerday: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, //no hace falta pasarlo, se crea solo
        allowNull: false,
      },
    });
    // Agregar indice unico a email
    await queryInterface.addIndex("users", ["email"], {
      unique: true,
      name: "unique_email_index",
    });
    // Agregar indice unico a username
    await queryInterface.addIndex("users", ["username"], {
      unique: true,
      name: "unique_username_index",
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tabla users
    await queryInterface.dropTable("users");
  },
};
