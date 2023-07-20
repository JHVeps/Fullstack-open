const router = require("express").Router();
const { ReadList } = require("../models");

router.post("/", async (req, res) => {
  const blogToRead = await ReadList.create(req.body);
  res.json(blogToRead);
});

module.exports = router;
