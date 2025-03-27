const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const connectDB = require("./config/db"); // Comment this out

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Comment out the DB connection
// connectDB();

// Test API
app.get("/", (req, res) => {
  res.send("Backend is running without MongoDB!");
});

// Import routes
app.use("/api/auth", require("./routes/authRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
