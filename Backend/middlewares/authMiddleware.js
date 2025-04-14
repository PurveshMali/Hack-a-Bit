// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // your user model

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token) // Bearer <token>
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    console.log(user, decoded.userId)
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // Attach full user object or just the ID
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
