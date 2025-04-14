// utils/sendMassEmail.js
const nodemailer = require("nodemailer");
const User = require("../models/User"); // adjust path as per your project

const sendMassEmail = async (subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const users = await User.find({});
  const emailList = users.map((u) => u.email);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: '',
    bcc: emailList,
    subject: subject,
    html: message,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMassEmail;
