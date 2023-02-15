const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test 1",
    author: "Tester Ted",
    likes: 1,
  },
  {
    title: "Test 2",
    author: "Tester Tod",
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
