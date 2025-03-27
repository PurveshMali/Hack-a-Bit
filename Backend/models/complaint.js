const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  photo: String,
  description: { type: String, required: true },
  daysToResolve: { type: Number, required: true },
  complaintId: { type: String, unique: true, required: true },

  // Dropdown menu for issue type
  natureOfIssue: {
    type: String,
    enum: [
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

  // Automatically assign priority
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true
  }
});

// Assign priority based on natureOfIssue
complaintSchema.pre("save", function (next) {
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

  if (highPriority.includes(this.natureOfIssue)) {
    this.priority = "High";
  } else if (mediumPriority.includes(this.natureOfIssue)) {
    this.priority = "Medium";
  } else {
    this.priority = "Low";
  }

  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
