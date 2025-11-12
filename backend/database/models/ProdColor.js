const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, DataTypes) => {
  const alias = "ProdColor";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "products", // nombre de la tabla de productos
        key: "id",
      },
    },
    colorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "colors", // nombre de la tabla de colores
            key: "id",
        }
    },
  };

  const config = {
    tableName: "prodcolors",
    timestamps: false,
  };

  const ProdColor = sequelize.define(alias, cols, config);

  ProdColor.associate = (models) => {
    ProdColor.belongsTo(models.Product, { foreignKey: "productId", as: "product" }); // Relacion con Product
    ProdColor.belongsTo(models.Color, { // Relacion con Color
      foreignKey: "colorId",
      as: "color",
    });
  };

  return ProdColor;
};
