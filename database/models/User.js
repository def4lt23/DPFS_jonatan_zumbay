module.exports = (sequelize, DataTypes) => {
  const alias = "User";
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    numberphone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM("admin", "client"),
      allowNull: false,
      defaultValue: "client",
    },
    avatar: {
      type: DataTypes.STRING(255),
    },
    registerday: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, //no hace falta pasarlo, se crea solo
    },
  };

  const config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => { //relaciones
    User.hasOne(models.Cart, { foreignKey: "userId", as: "cart" });
    //tabla origen.tipo de relacion. tabla destino {id de la tabla destino que relaciona, alias}
    User.hasMany(models.Order, { foreignKey: "userId", as: "orders" });
  };

  return User;
};
