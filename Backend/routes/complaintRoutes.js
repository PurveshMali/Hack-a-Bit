const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Complaint = require("../models/complaint");
const { generatePDF } = require("../controllers/pdfController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/submit", upload.single("photo"), async (req, res) => {
  try {
    const { name, address, mobileNumber, description, daysToResolve, natureOfIssue } = req.body;

    // Validate required fields
    if (!name || !mobileNumber || !description || !natureOfIssue) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Define priority levels
    const highPriority = [
      "Water Supply Issue",
      "Garbage Accommodation",
      "Road Obstruction",
      "Fire and Electrical Hazards",
      "Dead Animal Removal"
    ];
    const mediumPriority = [
      "Road Damage",
      "Street Light Malfunction",
      "Illegal Dumping Waste",
      "Public Toilet Maintenance Issue",
      "Drainage Issue"
    ];
    const lowPriority = [
      "Tree Trimming / Fallen Branches",
      "Public Park and Playground Maintenance",
      "Public Transport Issue"
    ];

    // Assign priority based on natureOfIssue
    let priority;
    if (highPriority.includes(natureOfIssue)) {
      priority = "High";
    } else if (mediumPriority.includes(natureOfIssue)) {
      priority = "Medium";
    } else if (lowPriority.includes(natureOfIssue)) {
      priority = "Low";
    } else {
      return res.status(400).json({ message: "Invalid natureOfIssue provided!" });
    }

    const complaintId = uuidv4();
    const newComplaint = new Complaint({
      name,
      address,
      mobileNumber,
      photo: req.file ? req.file.filename : "",
      description,
      daysToResolve,
      complaintId,
      natureOfIssue,
      priority
    });

    await newComplaint.save();
    const pdfPath = await generatePDF(newComplaint);

    res.status(201).json({ message: "Complaint Registered!", complaintId, pdfPath });
  } catch (error) {
    res.status(500).json({ message: "Error registering complaint", error: error.message });
  }
});

router.get("/get-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
  }
});

module.exports = router;