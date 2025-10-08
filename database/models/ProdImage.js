module.exports = (sequelize, DataTypes) => {
  const alias = "ProdImage";

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
        model: "products", // nombre exacto de la tabla
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // si se borra el producto, borra sus imagenes
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  };

  const config = {
    tableName: "prodimages",
    timestamps: false,
  };

  const ProdImage = sequelize.define(alias, cols, config);

  ProdImage.associate = (models) => {
    ProdImage.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return ProdImage;
};
