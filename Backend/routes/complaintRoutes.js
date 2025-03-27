const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Complaint = require("../models/complaint");
const { generatePDF } = require("../controllers/pdfController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/submit", upload.single("photo"), async (req, res) => {
  try {
    if (!req.body.name || !req.body.mobileNumber || !req.body.description) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const complaintId = uuidv4();
    const newComplaint = new Complaint({
      name: req.body.name,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      photo: req.file ? req.file.filename : "",
      description: req.body.description,
      daysToResolve: req.body.daysToResolve,
      complaintId,
    });

    await newComplaint.save();
    const pdfPath = await generatePDF(newComplaint);

    res.status(201).json({ message: "Complaint Registered!", complaintId, pdfPath });
  } catch (error) {
    res.status(500).json({ message: "Error registering complaint", error: error.message });
  }
});

module.exports = router;
