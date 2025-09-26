module.exports = (sequelize, DataTypes) => {
  const alias = "CartItem";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    cartid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "carts", // nombre de la tabla del carrito
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
  };

  const config = {
    tableName: "cartitems",
    timestamps: false,
  };

  const CartItem = sequelize.define(alias, cols, config);
  return CartItem;
};
