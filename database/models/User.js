module.exports = (sequelize, DataTypes) => {
    const alias = "User";
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING(100)
        },
        numberphone: {
            type: DataTypes.STRING(20)
        },
        addres: {
            type: DataTypes.TEXT
        },
        rol: {
            type: DataTypes.STRING(20)
        },
        avatar: {
            type: DataTypes.STRING(255)
        },
        registerday: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW //no hace falta pasarlo, se crea solo
        }


    }

    const config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);
    return User;

}