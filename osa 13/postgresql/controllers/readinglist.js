const router = require("express").Router();
const { ReadList, User } = require("../models");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const { tokenExtractor } = require("../util/middlewares");

//middleware for finding blog
const readListFinder = async (req, res, next) => {
  req.readlist = await ReadList.findByPk(req.params.id);
  next();
};

router.post("/", async (req, res) => {
  try {
    console.log("body: ", req.body);
    const blogToRead = await ReadList.create({
      ...req.body,
      read: false,
    });
    res.json(blogToRead);
  } catch (error) {
    console.error("Error creating readlist entry:", error);
    res.status(500).json({ error: "Failed to create readlist entry." });
  }
});

router.put("/:id", readListFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user.id === req.readlist.userId) {
    req.readlist.read = req.body.read;
    await req.readlist.save();
    res.json(req.readlist);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
