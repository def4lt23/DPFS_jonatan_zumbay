module.exports = (sequelize, DataTypes) => {
  const alias = "OrderDetail";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    orderid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "orders", // nombre de la tabla de ordenes
        key: "id",
      },
    },
    productid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "products", // nombre de la tabla de productos
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    price: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
    }
  };

  const config = {
    tableName: "orderdetails",
    timestamps: false,
  };

  const OrderDetail = sequelize.define(alias, cols, config);
  return OrderDetail;
};
