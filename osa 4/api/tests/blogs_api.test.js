const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

describe("when there is initially some blogs saved", () => {
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

  describe("addition of a new blog", () => {
    test("adding a valid blog", async () => {
      const user = {
        username: "root",
      };

      const currentUser = await User.findOne({ username: user.username });

      const userForToken = {
        username: currentUser.username,
        id: currentUser._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      console.log("user id", currentUser.id);

      const newBlog = {
        title: "Valid Blog",
        author: "Valid Ted",
        url: "testurl",
        likes: 1,
        user: currentUser.id,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: `bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).toContain("Valid Blog");
    });

    test("if no likes then likes will be set to 0", async () => {
      const user = {
        username: "root",
      };

      const currentUser = await User.findOne({ username: user.username });

      const userForToken = {
        username: currentUser.username,
        id: currentUser._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      const newBlog = {
        title: "Blog Without Id",
        author: "Also Valid",
        url: "testurl",
        user: currentUser.id,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: `bearer ${token}` })
        .send(newBlog)
        .expect(201);

      const blogsAtEnd = await helper.blogsInDb();

      const likes = blogsAtEnd.map((blog) => blog.likes);
      expect(likes).toContain(0);
    });

    test("if no title or url then response status 400 Bad request", async () => {
      const newBlog = {
        author: "Not Valid",
        likes: 3,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("updating blog", () => {
    test("if blog likes will be updated then succesful update returns status code 201", async () => {
      const blogsBeforeUpdate = await helper.blogsInDb();
      const blogToUpdate = blogsBeforeUpdate[0];
      const newLikes = {
        likes: 10,
      };

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newLikes).expect(201);

      const blogsAfterUpdate = await helper.blogsInDb();
      const updatedBlog = blogsAfterUpdate[0];
      expect(updatedBlog.likes).toBe(10);
    });
  });

  describe("deletion of a blog", () => {
    test("is succesful with valid id returns status code 204", async () => {
      const user = {
        username: "root",
      };

      const currentUser = await User.findOne({ username: user.username });

      const userForToken = {
        username: currentUser.username,
        id: currentUser._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      const newBlog = {
        title: "BlogDeletion",
        author: "Deleter",
        url: "testurl",
        likes: 5,
        user: currentUser.id,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: `bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogForDeletion = await Blog.findOne({ title: newBlog.title });

      console.log("blog for deletion: ", blogForDeletion);

      await api
        .delete(`/api/blogs/${blogForDeletion.id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(204);

      const blogsAfterDelete = await helper.blogsInDb();

      const titles = blogsAfterDelete.map((b) => b.title);

      expect(titles).not.toContain(blogForDeletion.title);
    });
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("users are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  describe("addition of a new user", () => {
    test("creation succeeds with a fresh username", async () => {
      const usersBeforePost = await helper.usersInDb();

      const newUser = {
        username: "testuser",
        name: "User Fortesting",
        password: "secret",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAfterPost = await helper.usersInDb();
      expect(usersAfterPost).toHaveLength(usersBeforePost.length + 1);

      const usernames = usersAfterPost.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersBeforePost = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("expected `username` to be unique");

      const usersAfterPost = await helper.usersInDb();
      expect(usersAfterPost).toHaveLength(usersBeforePost.length);
    });

    test("creation fails with proper statuscode and message if username too short", async () => {
      const usersBeforePost = await helper.usersInDb();

      const newUser = {
        username: "no",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "User validation failed: username: Path `username` (`no`) is shorter than the minimum allowed length (3)."
      );

      const usersAfterPost = await helper.usersInDb();
      expect(usersAfterPost).toHaveLength(usersBeforePost.length);
    });

    test("creation fails with proper statuscode and message if password too short", async () => {
      const usersBeforePost = await helper.usersInDb();

      const newUser = {
        username: "not",
        name: "Superuser",
        password: "no",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "status code 400, ValidationError, password must be at least 3 characters"
      );

      const usersAfterPost = await helper.usersInDb();
      expect(usersAfterPost).toHaveLength(usersBeforePost.length);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
