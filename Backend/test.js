// const bcrypt = require("bcryptjs");
// const Admin = require("./models/Admin"); // Adjust the path as necessary
// const mongoose = require("mongoose");

// async function createAdmin() {
//   const hashedPassword = await bcrypt.hash("admin123", 10);
//   const mongoose = require("mongoose");

//   mongoose.connect("mongodb://127.0.0.1:27017/SCMS", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("MongoDB connection error:", err));
  
//   const admin = new Admin({
//     email: "admin@gmail.com",
//     password: hashedPassword
//   });

//   await admin.save();
//   console.log("Admin created");
// }
// createAdmin();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "purveshmali99@gmail.com", // apna email daal yaha
  subject: "Testing Email",
  text: "This is a test email",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) return console.error("❌ Error:", err);
  console.log("✅ Sent:", info.response);
});
