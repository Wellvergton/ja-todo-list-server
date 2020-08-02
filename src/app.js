require("dotenv").config();
require("./database");

const express = require("express");
const app = express();
const routes = require("./routes");

const port = process.env.PORT;

app.use(express.json());
app.use("/", routes);

app.listen(port);
