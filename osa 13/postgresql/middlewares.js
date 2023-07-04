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

module.exports = {
  errorHandler,
  unknownEndpoint,
};
