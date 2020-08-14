const routes = require("express").Router();
const SessionController = require("./controllers/SessionController");
const TodoController = require("./controllers/TodoController");
const UserController = require("./controllers/UserController");

const checkValidSession = require("./middlewares/checkValidSession");

routes.post("/login/", SessionController.login);
routes.post("/logout/", SessionController.logout);

routes.all("/users/", checkValidSession);
routes.post("/users/", UserController.store);
routes.put("/users/", UserController.update);
routes.delete("/users/", UserController.delete);

routes.all("/todos/:user_id/", checkValidSession);
routes.get("/todos/:user_id/", TodoController.index);
routes.post("/todos/:user_id/", TodoController.store);
routes.put("/todos/:user_id/", TodoController.update);
routes.delete("/todos/:user_id/", TodoController.delete);

module.exports = routes;
