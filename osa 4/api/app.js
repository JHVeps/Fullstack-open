const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
