require("dotenv").config();
const { Sequelize } = require("sequelize");

const express = require("express");
const { Blog } = require("./models/blog");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.post("/api/blogs", async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: { id: req.params.id },
    });
    return res.status(201).json("deleted");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
