const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  // user from request object has username and id values
  const currentUser = request.user;

  console.log("reguest.user: ", request.user);
  console.log("request.token: ", request.token);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(currentUser.id);

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id,
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
  const userId = request.user.id;
  const blog = await Blog.findById(blogId);
  const userIdInBlog = blog.user.toString();

  console.log("blog id params: ", blogId);
  console.log("user id params: ", userId);
  console.log("userInBlog: ", userIdInBlog);

  if (!request.token) {
    return response.status(400).json({ message: "token missing, try login" });
  }

  if (userIdInBlog === userId) {
    try {
      await Blog.findByIdAndDelete(blogId);
      response.status(204).json({ message: "Blog deleted successfully" });
    } catch (exception) {
      next(exception);
    }
  }
});

module.exports = blogsRouter;
