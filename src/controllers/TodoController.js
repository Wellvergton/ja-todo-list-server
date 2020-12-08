const Todo = require("../models/Todo");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const user_id = req.session.uid;

    const user = await User.findByPk(user_id, {
      include: {
        association: "todos",
        attributes: ["id", "title", "description", "date"],
      },
    });

    if (!user) {
      return res.sendStatus(404);
    }

    user.todos.forEach((todo) => (todo.date = JSON.parse(todo.date)));

    return res.json(user.todos);
  },

  async store(req, res) {
    const user_id = req.session.uid;
    const { title, context, type, description, date } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.sendStatus(404);
    }

    const todo = await Todo.create({
      user_id,
      title,
      context,
      description,
      type,
      date: JSON.stringify(date),
    });

    return res.json(todo);
  },

  async update(req, res) {
    const user_id = req.session.uid;
    const { id, title, context, description, type, date } = req.body;

    const user = User.findByPk(user_id);

    if (!user) {
      return res.sendStatus(404);
    }

    await Todo.update(
      { title, context, description, type, date: JSON.stringify(date) },
      { where: { id, user_id } }
    );

    const updatedTodo = await Todo.findByPk(id);

    return res.json(updatedTodo);
  },

  async delete(req, res) {
    const user_id = req.session.uid;
    const { id } = req.body;

    const user = User.findByPk(user_id);

    if (!user) {
      return res.sendStatus(404);
    }

    await Todo.destroy({ where: { id, user_id } });

    return res.send();
  },
};
