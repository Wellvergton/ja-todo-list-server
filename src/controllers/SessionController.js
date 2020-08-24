const Session = require("../models/Session");
const User = require("../models/User");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.checkPassword(password)) {
      return res.status(404).json({ error: "Incorrect password" });
    }

    const sid = req.session.id;
    req.session.uid = user.getDataValue("id");

    await ((req) => {
      return new Promise((resolve) => {
        req.session.save((error) => resolve(error));
      });
    })(req);

    const session = await Session.findOne({ where: { sid } });

    await session.update(
      { user_id: user.getDataValue("id") },
      { where: { sid } }
    );

    res.sendStatus(200);
  },

  async logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  },
};
