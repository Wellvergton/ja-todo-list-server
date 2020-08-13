const Session = require("../models/Session");

module.exports = async (req, res, next) => {
  const sid = req.session.id;
  const session = await Session.findByPk(sid);

  if (session) {
    next();
  } else {
    res.sendStatus(403);
  }
};
