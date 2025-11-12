const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const alias = "Order";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users", // nombre de la tabla del carrito
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, //se crea solo
    },
    total: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: "pending",
    },
  };

  const config = {
    tableName: "orders",
    timestamps: false,
  };

  const Order = sequelize.define(alias, cols, config);

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Order.hasMany(models.OrderDetail, { foreignKey: "orderId", as: "items" });
  };

  return Order;
};
