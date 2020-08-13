require("dotenv").config();
require("./database");

const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./routes");

const checkValidSession = require("./middlewares/checkValidSession");

const app = express();
const store = new SequelizeStore({
  db: require("./database"),
  table: "Session",
  checkExpirationInterval: 1000 * 60 * 60,
});

app.use(
  session({
    secret: [
      process.env.CURRENT_SESSION_SECRET,
      process.env.PAST_SESSION_SECRET,
    ],
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(checkValidSession);
app.use(express.json());
app.use("/", routes);

store.sync();

app.listen(process.env.PORT);
