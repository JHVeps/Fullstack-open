const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

module.exports = mongoose.model("User", userSchema);
