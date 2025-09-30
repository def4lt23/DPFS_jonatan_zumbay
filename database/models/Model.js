module.exports = (sequelize, DataTypes) => {
  const alias = "Model";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  };

  const config = {
    tableName: "models",
    timestamps: false,
    indexes: [{ fields: ["name"] }],
  };

  const Model = sequelize.define(alias, cols, config);

  Model.associate = (models) => {
    Model.hasMany(models.Product, { foreignKey: "modelId", as: "products" });
  };

  return Model;
};
