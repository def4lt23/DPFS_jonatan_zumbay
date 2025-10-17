module.exports = (sequelize, DataTypes) => {
  const alias = "Product";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    modelId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "models", // tabla a la que referencia
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    size: {
      type: DataTypes.ENUM("Mediana", "Grande"),
      allowNull: false,
      defaultValue: "Mediana",
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };

  const config = {
    tableName: "products",
    timestamps: false,
    indexes: [
      //indices para agilizar busquedas
      { fields: ["price"] },
      { fields: ["featured"] },
      { fields: ["modelId"] },
    ],
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    //relaciones
    Product.belongsTo(models.Model, { foreignKey: "modelId", as: "model" }); //relacion con modelo
    Product.belongsToMany(models.Color, {
      through: models.ProdColor,
      foreignKey: "productId",
      otherKey: "colorId",
      as: "colors",
    });
    Product.hasMany(models.ProdImage, { //relacion con imagenes
      foreignKey: "productId",
      as: "images",
    });
    Product.hasMany(models.CartItem, { //relacion con items del carrito
      foreignKey: "productId", 
      as: "cartItems",
    });
    Product.hasMany(models.OrderDetail, { //relacion con detalles de orden
      foreignKey: "productId",
      as: "orderItems",
    });
  };

  return Product;
};
