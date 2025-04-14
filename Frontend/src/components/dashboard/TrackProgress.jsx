"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Award, FileText } from "lucide-react";
import axios from "axios";

const TrackProgress = ({ complaintId }) => {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStageIcon = (status) => {
    switch (status) {
      case "Completed":
        return <Check className="text-green-500" />;
      case "In Progress":
        return <Clock className="text-blue-500" />;
      case "Pending":
        return <Award className="text-yellow-500" />;
      default:
        return <FileText className="text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Awaiting Progress";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const determineTimeline = (status, createdDate) => {
    const timeline = [];
    const stageData = [
      {
        stage: "Complaint Registered",
        description: "Your complaint has been registered successfully.",
        officer: "System Auto",
        dateOffset: 0,
      },
      {
        stage: "Under Investigation",
        description: "The issue is currently being investigated by the respective officer.",
        officer: "Officer XYZ",
        dateOffset: 1,
      },
      {
        stage: "Issue Resolved",
        description: "The issue has been resolved successfully.",
        officer: "Officer XYZ",
        dateOffset: 2,
      },
    ];

    const stageCount =
      status === "pending" ? 1 : status === "in progress" ? 2 : 3;

    for (let i = 0; i < stageCount; i++) {
      let stageStatus =
        i < stageCount - 1
          ? "Completed"
          : status === "completed"
          ? "Completed"
          : "In Progress";

      timeline.push({
        ...stageData[i],
        status: stageStatus,
        date: new Date(
          createdDate.getTime() + stageData[i].dateOffset * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }

    return timeline;
  };

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/complaints/get-user-complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const complaints = res.data || [];

        const matchedComplaint = complaints.find(
          (item) => item.complaintId === complaintId
        );

        if (matchedComplaint) {
          const createdDate = new Date(matchedComplaint.createdAt || new Date());
          const status = matchedComplaint.status?.toLowerCase(); // normalize for safety

          const timeline = determineTimeline(status, createdDate);
          matchedComplaint.timeline = timeline;

          setComplaint(matchedComplaint);
        } else {
          setComplaint(null);
        }
      } catch (error) {
        console.error("Failed to fetch complaints", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [complaintId]);

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  if (!complaint) {
    return (
      <div className="text-center text-red-400 py-10">
        Complaint ID "{complaintId}" not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
          Complaint Progress
        </h2>
        <p className="text-gray-400 text-center mb-6">
          ID: {complaint._id} | Subject: {complaint.natureOfIssue}
        </p>

        {/* Timeline */}
        <div className="relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700">
          {complaint.timeline?.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16 pb-8 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-900">
                {getStageIcon(stage.status)}
              </div>
              <div
                className={`rounded-xl p-4 ${
                  stage.status === "Completed"
                    ? "bg-green-900/20 border-l-4 border-green-500"
                    : stage.status === "In Progress"
                    ? "bg-blue-900/20 border-l-4 border-blue-500"
                    : "bg-gray-700 border-l-4 border-gray-500"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{stage.stage}</h3>
                  <span className="text-sm text-gray-400">{stage.status}</span>
                </div>
                <p className="text-sm text-gray-300 mb-1">
                  {stage.description}
                </p>
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>Officer: {stage.officer}</span>
                  <span>{formatDate(stage.date)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;
