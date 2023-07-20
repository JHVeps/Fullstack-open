const express = require("express");
require("express-async-errors"); // Import and apply express-async-errors

const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const authorsRouter = require("./controllers/authors");
const loginRouter = require("./controllers/login");
const readingListRouter = require("./controllers/readinglist");

const { errorHandler, unknownEndpoint } = require("./util/middlewares");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglist", readingListRouter);

// Error handling middleware
app.use(errorHandler);

// Unknown endpoint middleware
app.use(unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
