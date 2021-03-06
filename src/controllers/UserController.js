const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({ error: "Passwords does not match" });
    }

    await User.create({ name, email, password });

    return res.sendStatus(200);
  },

  async update(req, res) {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.update({ name, email, password }, { where: { email } });

    return res.send();
  },

  async delete(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.destroy({ where: { email } });

    return res.send();
  },
};
