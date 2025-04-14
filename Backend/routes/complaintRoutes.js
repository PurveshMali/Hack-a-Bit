const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Complaint = require("../models/complaint");
const { generatePDF } = require("../controllers/pdfController");
const upload = require("../middlewares/uploadImages");
const uploadToCloudinary = require("../utils/cloudinary"); // Import the Cloudinary upload function
const router = express.Router();
const authenticateUser = require("../middlewares/authMiddleware"); // Import the authentication middleware

router.post(
  "/submit",
  authenticateUser, // 🧠 must come before multer
  upload.fields([
    { name: "problemImage", maxCount: 1 },
    { name: "supportingDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        address,
        mobileNumber,
        description,
        daysToResolve,
        natureOfIssue,
      } = req.body;

      console.log(req.body); // Log the request body for debugging
      // Get the authenticated user's ID
      const userId = req.user._id;
      console.log(userId);

      if (
        !name ||
        !address ||
        !mobileNumber ||
        !description ||
        !daysToResolve ||
        !natureOfIssue
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Upload to Cloudinary
      console.log(req.files.problemImage[0])
      console.log(req.files.supportingDocument[0])
      const problemImage = req.files?.problemImage?.[0];
      const supportingDocument = req.files?.supportingDocument?.[0];

      let problemImageUrl = "";
      let supportingDocUrl = "";

      console.log("---------------------------")
      console.log(problemImage.buffer)
      if (problemImage) {
        const uploaded = await uploadToCloudinary(problemImage.buffer, "complaints");
        problemImageUrl = uploaded.secure_url;
        console.log("Problem image uploaded:", problemImageUrl);
      }
      

      if (supportingDocument) {
        const uploaded = await uploadToCloudinary(supportingDocument.buffer, "complaints");
        supportingDocUrl = uploaded.secure_url;
        console.log("Problem image uploaded:", supportingDocUrl);
      }

      // Priority logic
      const highPriority = [
        "Water Supply Issue",
        "Garbage Accommodation",
        "Road Obstruction",
        "Fire and Electrical Hazards",
        "Dead Animal Removal",
      ];
      const mediumPriority = [
        "Road Damage",
        "Street Light Malfunction",
        "Illegal Dumping Waste",
        "Public Toilet Maintenance Issue",
        "Drainage Issue",
      ];
      const lowPriority = [
        "Tree Trimming / Fallen Branches",
        "Public Park and Playground Maintenance",
        "Public Transport Issue",
      ];

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


      // Save complaint
      const complaintId = uuidv4();
      const newComplaint = new Complaint({
        name,
        address,
        mobileNumber,
        description,
        daysToResolve,
        complaintId,
        natureOfIssue,
        problemImageUrl,
        supportingDocUrl,
        userId, // ✅ Now using the MongoDB _id
        priority
      });

      await newComplaint.save();
      const pdfPath = await generatePDF(newComplaint);

      res.status(201).json({ message: "Complaint registered", complaintId, pdfPath });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  }
);

router.get("/get-user-complaints", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const complaints = await Complaint.find({ userId });
    console.log(complaints);

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints",
      error: error.message,
    });
  }
});

router.get("/get-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching complaints", error: error.message });
  }
});

module.exports = router;
