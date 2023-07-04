const express = require("express");
require("express-async-errors"); // Import and apply express-async-errors

const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const { errorHandler, unknownEndpoint } = require("./middlewares");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

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
