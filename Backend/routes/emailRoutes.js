const express = require("express");
const router = express.Router();
const sendMassEmail = require("../utils/sendMassEmail");

// Optional: middleware for admin auth
// const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/send-email-to-all", async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ error: "Subject and message are required" });
    }

    const info = await sendMassEmail(subject, message);

    res.status(200).json({ message: "Emails sent!", messageId: info.messageId });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send emails" });
  }
});

module.exports = router;
