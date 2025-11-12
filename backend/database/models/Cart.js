const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const alias = "Cart";
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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  const config = {
    tableName: "carts",
    timestamps: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Cart.hasMany(models.CartItem, { foreignKey: "cartId", as: "items" });
  };

  return Cart;
};
