const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const alias = "Cart";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users", // nombre de la tabla del carrito
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      toDefaultValue: DataTypes.NOW, //se crea solo
    },
    active: {
      type: DataTypes.BOOLEAN,
      toDefaultValue: false,
    },
  };

  const config = {
    tableName: "carts",
    timestamps: false,
  };

  const Cart = sequelize.define(alias, cols, config);
  return Cart;
};
