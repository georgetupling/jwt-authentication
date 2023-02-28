const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

const hash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

const compare = async (password, foundPassword) => {
  try {
    const match = await bcrypt.compare(password, foundPassword);
    return match;
  } catch (err) {
    console.error(err);
  }
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  let match = false;
  if (foundUser) {
    match = await compare(password, foundUser.password);
  }
  if (foundUser && match) {
    const token = jwt.sign({ email }, process.env.SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.send("Login successful");
  } else if (email === "" || password === "") {
    res.status(401).json({ message: "Please enter a username and password" });
  } else if (foundUser && !match) {
    res.status(401).json({ message: "Incorrect password" });
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email, password: password });

  if (foundUser) {
    res.status(401).json({ message: "User already exists" });
  } else {
    const hashedPassword = await hash(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    newUser.save();
    const token = jwt.sign({ email }, process.env.SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.send("Signup successful");
  }
});

module.exports = router;
