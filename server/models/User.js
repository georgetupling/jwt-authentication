const mongoose = require("../db");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const User = model("User", userSchema);

module.exports = User;
