const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Todo = require("../models/Todo");
const User = require("../models/User");

const connection = new Sequelize(dbConfig);

Todo.init(connection);
User.init(connection);

Todo.associtate(connection.models);
User.associtate(connection.models);

module.exports = connection;
