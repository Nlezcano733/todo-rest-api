const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.decode(token, process.env.SECRET);
    req.userId = decoded.id;

    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = verifyToken;
