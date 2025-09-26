const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const alias = "Order";
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
    total: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      DefaultValue: false,
    },
  };

  const config = {
    tableName: "orders",
    timestamps: false,
  };

  const Order = sequelize.define(alias, cols, config);
  return Order;
};
