const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function verifyToken(req, res, next) {
  //   const token = req.headers.authorization.split(" ")[1];
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.email = decoded.email;
    next();
  });
}

module.exports = { verifyToken };
