const User = require("../models/User");
const { update } = require("../models/User");

module.exports = {
  async index(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await User.checkPassword(password))) {
      res.status(401).json({ message: "Incorrect password" });
    }

    res.json(user);
  },

  async store(req, res) {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    return res.send(newUser);
  },

  async update(req, res) {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.update({ name, email, password }, { where: { email } });

    return res.send();
  },

  async delete(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.destroy({ where: { email } });

    return res.send();
  },
};
