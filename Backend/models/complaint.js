const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  problemImageUrl: { type: String },        // New
  supportingDocUrl: { type: String },       // New
  description: { type: String, required: true },
  daysToResolve: { type: Number, required: true },
  complaintId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // New

  natureOfIssue: {
    type: String,
    enum:[
      "Water Supply Issue",
      "Garbage Accommodation",
      "Road Obstruction",
      "Fire and Electrical Hazards",
      "Dead Animal Removal",
      "Road Damage",
      "Street Light Malfunction",
      "Illegal Dumping Waste",
      "Public Toilet Maintenance Issue",
      "Drainage Issue",
      "Tree Trimming / Fallen Branches",
      "Public Park and Playground Maintenance",
      "Public Transport Issue"
    ],
    required: true
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  }
  
});

module.exports = mongoose.model("Complaint", complaintSchema);
