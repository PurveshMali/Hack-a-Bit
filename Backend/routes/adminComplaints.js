const express = require("express");
const Complaint = require("../models/complaint");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Get all complaints (with optional status filter)
router.get("/", adminAuth, async (req, res) => {
  const { status } = req.query;

  try {
    const filter = status ? { status } : {};
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching complaints", error: err.message });
  }
});

// Update complaint status
router.patch("/update-status/:complaintId", async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  console.log("Updating status for complaint:", complaintId, "to", status);

  try {
    const complaint = await Complaint.findOneAndUpdate(
      { complaintId },
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Status updated", complaint });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
