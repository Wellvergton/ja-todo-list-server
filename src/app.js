require("dotenv").config();
require("./database");

const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./routes");

const app = express();
const store = new SequelizeStore({
  db: require("./database"),
  tableName: "sessions",
  checkExpirationInterval: 1000 * 60 * 5,
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
      maxAge: 1000 * 60 * 5,
    },
  })
);
app.use(express.json());
app.use("/", routes);

store.sync();

app.listen(process.env.PORT);
