const routes = require("express").Router();
const TodoController = require("./controllers/TodoController");
const UserController = require("./controllers/UserController");

routes.post("/users/", UserController.store);
routes.put("/users/", UserController.update);
routes.delete("/users/", UserController.delete);

routes.get("/todos/:user_id/", TodoController.index);
routes.post("/todos/:user_id/", TodoController.store);
routes.put("/todos/:user_id/", TodoController.update);
routes.delete("/todos/:user_id/", TodoController.delete);

module.exports = routes;
