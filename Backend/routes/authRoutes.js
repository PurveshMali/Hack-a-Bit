const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Temporary storage (Instead of MongoDB)
let users = [];

// Signup Route 
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation: Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user (excluding password in response)
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    res.json({ message: "User registered successfully", user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation: Check if fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find user
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

  res.json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
});

module.exports = router;

