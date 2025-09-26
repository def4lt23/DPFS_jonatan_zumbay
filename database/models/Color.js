module.exports = (sequelize, DataTypes) => {
    const alias = "Color";
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }

    const config = {
        tableName: "colors",
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);
    return Color;

}