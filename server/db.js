const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.set("strictQuery", true);

uri = process.env.MONGODB_URI;

mongoose.connect(uri, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Successfully connected to MongoDB.");
  }
});

module.exports = mongoose;
