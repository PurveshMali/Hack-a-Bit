"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const Analytics = ({ setActiveTab , setComplaintId}) => {
  const [complaints, setComplaints] = useState([]);
  const COLORS = ["#10B981", "#3B82F6", "#EC4899", "#F59E0B", "#EF4444"];

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/complaints/get-user-complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const complaintStatusData = complaints.reduce((acc, complaint) => {
    const existing = acc.find((c) => c.name === complaint.natureOfIssue);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: complaint.natureOfIssue, value: 1 });
    }
    return acc;
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

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
          {/* Pie Chart */}
          {/* Pie Chart with Legend */}
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
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {complaintStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                  }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legends */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {complaintStatusData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white text-sm"
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Complaints as Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-white text-center">
              Recent Complaints
            </h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {complaints.map((complaint, index) => (
                <div
                  key={index}
                  onClick={() => {
                    localStorage.setItem(
                      "selectedComplaint",
                      JSON.stringify(complaint)
                    );
                    console.log(complaint); 
                    setComplaintId(complaint.complaintId);
                    setActiveTab("Track Progress");
                  }}
                  className="bg-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer hover:bg-gray-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {complaint.name}
                    </h3>
                    <span
                      className={`text-sm text-white px-2 py-1 rounded-full ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                  <p className="text-sm text-pink-300">
                    {complaint.natureOfIssue}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {complaint.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
