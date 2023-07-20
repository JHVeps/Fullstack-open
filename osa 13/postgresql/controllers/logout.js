const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");

const { Session, User } = require("../models");

const { tokenExtractor } = require("../util/middlewares");

router.delete("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const session = await Session.findOne({ where: { username: user.username } });
  if (session.username === user.username) {
    await session.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
