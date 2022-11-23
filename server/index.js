require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {TravelPlan} = require("./models/travelPlans")
const {User} = require("./models/user")


const {addPlan, getAllPlans, getUserPlan, deletePlan, editPlan} = require("./controllers/travelPlans")
const {register, login} = require("./controllers/auth.js")
const {isAuthenticated} = require("./middleware/isAuthenticated")
const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(TravelPlan)
TravelPlan.belongsTo(User)



const { sequelize } = require("./util/database");

const { SERVER_PORT } = process.env;

app.post("/register", register)
app.post("/login", login)

app.get("/plans", getAllPlans)

app.get("/userplans/:userId", getUserPlan);
app.post("/plans/:userId", isAuthenticated, addPlan);
app.put("/plans/:id", isAuthenticated, editPlan);
app.delete("/plans/:id", isAuthenticated, deletePlan);

sequelize.sync().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });
});
