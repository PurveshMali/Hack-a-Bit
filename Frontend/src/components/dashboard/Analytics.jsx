"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const Analytics = () => {
  const [complaints, setComplaints] = useState([]);
  const COLORS = ["#10B981", "#3B82F6", "#EC4899"];

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints/get-complaints")
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  // Count complaints by issue type
  const complaintStatusData = complaints.reduce((acc, complaint) => {
    const existing = acc.find((c) => c.name === complaint.natureOfIssue);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: complaint.natureOfIssue, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 text-center"
        >
          Complaint Analytics Dashboard
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Complaint Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-white text-center">
              Complaints by Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complaintStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {complaintStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: "rgba(0,0,0,0.8)", color: "white" }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Complaints List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-white text-center">
              Recent Complaints
            </h2>
            <ul className="max-h-96 overflow-auto text-white">
              {complaints.map((complaint, index) => (
                <li key={index} className="p-4 bg-gray-700 rounded-lg mb-2">
                  <p><strong>{complaint.name}</strong></p>
                  <p className="text-sm">{complaint.natureOfIssue}</p>
                  <p className="text-xs text-gray-300">{complaint.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
