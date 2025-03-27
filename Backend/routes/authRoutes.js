const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User"); // Import User model

const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Store user details in request object
    next();
  });
};

// Signup Route (User Registration)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to MongoDB
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Profile Route (Protected)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Find user from MongoDB using ID stored in token
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password

    res.json({ message: "User Profile", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

module.exports = router;
