const jwt = require("jsonwebtoken");
const { SECRET } = require("./config.js");

const errorHandler = (error, request, response, next) => {
  if (error.name === "SequelizeValidationError") {
    const errorMessage = error.errors[0].message;
    return response.status(400).send({ error: errorMessage });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
};
