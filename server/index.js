require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { sequelize } = require("./util/database");

const { SERVER_PORT } = process.env;

sequelize.sync().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });
});
