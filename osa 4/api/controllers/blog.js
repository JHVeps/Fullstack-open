const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id,
  });

  if (title === undefined || url === undefined) {
    return response.status(400).json();
  }
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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
