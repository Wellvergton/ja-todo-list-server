const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Session = require("../models/Session");
const Todo = require("../models/Todo");
const User = require("../models/User");

const connection = new Sequelize(dbConfig);

Session.init(connection);
Todo.init(connection);
User.init(connection);

Todo.associtate(connection.models);
User.associtate(connection.models);

module.exports = connection;
