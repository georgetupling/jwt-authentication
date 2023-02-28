const express = require("express");
const mongoose = require("./db");
const dotenv = require("dotenv").config();
const { verifyToken } = require("./authMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/public")));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

// Protected route for testing authentication works

app.get("/protected", verifyToken, (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../client/protected.html"));
});

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
