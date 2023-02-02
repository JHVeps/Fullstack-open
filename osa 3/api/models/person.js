require("dotenv").config();
const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5}|\d{2}-\d{5}/.test(v); //111-11111 OR 11-11111 are ok
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
