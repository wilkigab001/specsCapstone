const { DataTypes } = require("sequilize");
const { sequelize } = require("sequelize");

module.exports = {
  User: sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }),
};
