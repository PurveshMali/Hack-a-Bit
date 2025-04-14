const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary")
const adminRoutes = require("./routes/admin");
const adminComplaintsRoutes = require("./routes/adminComplaints");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/admin", adminRoutes); // For login
app.use("/api/admin/complaints", adminComplaintsRoutes); // For admin complaints
app.use("/api/email", emailRoutes); // For sending emails

// Connect to MongoDB
connectDB();

// Test API
app.get("/", (req, res) => {
  res.send("Backend is running without MongoDB!");
});

// Import routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
