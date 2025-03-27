const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db"); // ✅ Correct
// connectDB(); // Call the function to connect to MongoDB


// Load environment variables
dotenv.config();

const app = express();

// Ensure necessary directories exist
const directories = ["uploads", "reports"];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SCMS Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
