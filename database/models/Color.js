module.exports = (sequelize, DataTypes) => {
  const alias = "Color";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true, //evito colores repetidos en nombre
    },
  };

  const config = {
    tableName: "colors",
    timestamps: false,
    indexes: [{ fields: ["name"] }],
  };

  const Color = sequelize.define(alias, cols, config);

  Color.associate = (models) => {
    Color.hasMany(models.Product, { foreignKey: "colorId", as: "products" });
  };

  return Color;
};
