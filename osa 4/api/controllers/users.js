const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .json(
        "status code 400, ValidationError, password must be at least 3 characters"
      );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
