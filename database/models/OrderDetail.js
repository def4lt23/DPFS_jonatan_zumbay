module.exports = (sequelize, DataTypes) => {
  const alias = "OrderDetail";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "orders", // nombre de la tabla de ordenes
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "products", // nombre de la tabla de productos
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
  };

  const config = {
    tableName: "orderdetails",
    timestamps: false,
  };

  const OrderDetail = sequelize.define(alias, cols, config);

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, { foreignKey: "orderId", as: "order" });
    OrderDetail.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return OrderDetail;
};
