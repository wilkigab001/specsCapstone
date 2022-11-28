const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Wishlist: sequelize.define("Wishlist", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false,
    },
  }),
};
