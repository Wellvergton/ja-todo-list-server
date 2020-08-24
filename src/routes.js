const routes = require("express").Router();
const SessionController = require("./controllers/SessionController");
const TodoController = require("./controllers/TodoController");
const UserController = require("./controllers/UserController");

const checkValidSession = require("./middlewares/checkValidSession");

routes.post("/login/", SessionController.login);
routes.post("/logout/", SessionController.logout);

routes.post("/users/", UserController.store);
routes.put("/users/", checkValidSession, UserController.update);
routes.delete("/users/", checkValidSession, UserController.delete);

routes.all("/todos/", checkValidSession);
routes.get("/todos/", TodoController.index);
routes.post("/todos/", TodoController.store);
routes.put("/todos/", TodoController.update);
routes.delete("/todos/", TodoController.delete);

module.exports = routes;
