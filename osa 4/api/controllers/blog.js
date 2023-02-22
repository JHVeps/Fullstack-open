const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  });

  if (title === undefined || url === undefined) {
    return response.status(400).json();
  }
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blogId = request.params.id;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, {
      new: true,
    });
    response.status(201).json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const blogId = request.params.id;

  try {
    await Blog.findByIdAndDelete(blogId);
    response.status(204).json({ message: "Blog deleted successfully" });
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
