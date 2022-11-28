const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");
const { User} = require("./user.js")
const {TravelPlan} = require("./travelPlans.js")

module.exports = {
  Wishlist: sequelize.define("wishlist", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
    }},
    travelPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TravelPlan,
        key: "id"
    }}
  }),
};
