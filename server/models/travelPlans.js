const {DataTypes}= require("sequelize")
const {sequelize} = require("../util/database")

module.exports = {
    TravelPlan: sequelize.define("travelplan", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false.value,
        },
        publicStatus: DataTypes.BOOLEAN,
        tripLocation: DataTypes.STRING,
        tripImg: DataTypes.TEXT,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING,
    })
}