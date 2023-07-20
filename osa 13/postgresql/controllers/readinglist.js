const router = require("express").Router();
const { ReadList } = require("../models");

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

module.exports = router;
