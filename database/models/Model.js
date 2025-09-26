module.exports = (sequelize, DataTypes) => {
    const alias = "Model";
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
        tableName: "models",
        timestamps: false
    }

    const Model = sequelize.define(alias, cols, config);
    return Model;

}