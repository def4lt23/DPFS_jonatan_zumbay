module.exports = (sequelize, DataTypes) => {
    const alias = "User";
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING
        },
        numberphone: {
            type: DataTypes.STRING
        },
        addres: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
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