const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("that blogs have a field called id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((blog) => blog.id);

  expect(ids).toBeDefined();
});

test("a valid blog can and will be added to DB", async () => {
  const newBlog = {
    title: "Valid Blog",
    author: "Valid Ted",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("Valid Blog");
});

test("if no likes then likes will be set to 0", async () => {
  const newBlog = {
    title: "Blog Without Id",
    author: "Also Valid",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const blogsAtEnd = await helper.blogsInDb();

  const likes = blogsAtEnd.map((blog) => blog.likes);
  expect(likes).toContain(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
