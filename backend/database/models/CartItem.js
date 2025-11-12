module.exports = (sequelize, DataTypes) => {
  const alias = "CartItem";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    cartId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "carts", // nombre de la tabla del carrito
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
  };

  const config = {
    tableName: "cartitems",
    timestamps: false,
  };

  const CartItem = sequelize.define(alias, cols, config);

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: "cartId", as: "cart" });
    CartItem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return CartItem;
};
