const router = require("express").Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const [rowsAffected] = await User.update(
    { username: req.body.username },
    { where: { username: req.params.username } }
  );

  if (rowsAffected === 0) {
    return res.status(404).end();
  }

  res.status(204).end();
});

module.exports = router;
