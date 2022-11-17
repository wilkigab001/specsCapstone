require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {TravelPlan} = require("./models/travelPlans")
const {User} = require("./models/user")
const {Wishlist} = require("./models/wishlist")
// const {addPlan, deletePlan, editPlan, getUserPlan, getAllPlans} = require("./controllers/travelPlans")
const {register, login} = require("./controllers/auth.js")
const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(TravelPlan)
TravelPlan.belongsTo(User)


const { sequelize } = require("./util/database");

const { SERVER_PORT } = process.env;

app.post("/register", register)
app.post("/login", login)

sequelize.sync().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });
});
