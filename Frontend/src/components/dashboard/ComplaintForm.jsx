"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobileNumber: "",  // Changed from mobile to mobileNumber
    natureOfIssue: "",
    description: "",
    daysToResolve: "",
    photo: null,
    supportingDocuments: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store only the first file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/complaints/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint. Please try again.");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 text-transparent mb-6">
          Submit a Complaint
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Your Address" required className="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400" />
          <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required className="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400" />
          <select name="natureOfIssue" value={formData.natureOfIssue} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-700/50 text-white">
            <option value="">Select Complaint Category</option>
            <option value="Water Supply Issue">Water Supply Issue</option>
            <option value="Garbage Accommodation">Garbage Accommodation</option>
            <option value="Road Obstruction">Road Obstruction</option>
            <option value="Fire and Electrical Hazards">Fire and Electrical Hazards</option>
            <option value="Dead Animal Removal">Dead Animal Removal</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Street Light Malfunction">Street Light Malfunction</option>
            <option value="Illegal Dumping Waste">Illegal Dumping Waste</option>
            <option value="Public Toilet Maintenance Issue">Public Toilet Maintenance Issue</option>
            <option value="Drainage Issue">Drainage Issue</option>
            <option value="Tree Trimming / Fallen Branches">Tree Trimming / Fallen Branches</option>
            <option value="Public Park and Playground Maintenance">Public Park and Playground Maintenance</option>
            <option value="Public Transport Issue">Public Transport Issue</option>
          </select>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the issue..." required className="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400"></textarea>
          <input type="number" name="daysToResolve" value={formData.daysToResolve} onChange={handleChange} placeholder="Expected days to resolve" required className="w-full p-3 rounded-lg bg-gray-700/50 text-white" />
          <label className="block text-gray-400">Upload Problem Photo (Optional)</label>
          <input type="file" name="photo" accept="image/*" onChange={handleFileChange} className="w-full text-gray-300 bg-gray-700/50 p-2 rounded-lg" />
          <label className="block text-gray-400">Upload Supporting Document (Aadhar Card)</label>
          <input type="file" name="supportingDocuments" accept="application/pdf, image/*" onChange={handleFileChange} className="w-full text-gray-300 bg-gray-700/50 p-2 rounded-lg" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-blue-500 px-4 py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-xl transition-all">
            {loading ? "Submitting..." : "Submit Complaint"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ComplaintForm;
