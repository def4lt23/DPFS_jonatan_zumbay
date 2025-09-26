module.exports = (sequelize, DataTypes) => {
    const alias = "Product";
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
        description: {
            type: DataTypes.STRING
        },
        modelid: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false
        },
        colorid: {
            type: DataTypes.INTEGER,
        },
        size: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }

    const config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    return Product;

}