const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, DataTypes) => {
    const alias = "ProdImage";
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "products", // nombre de la tabla de productos
                key: "id"
            }
        },
        url: {
            type: DataTypes.STRING,
        }
    }

    const config = {
        tableName: "prodimages",
        timestamps: false
    }

    const ProdImage = sequelize.define(alias, cols, config);
    return ProdImage;

}