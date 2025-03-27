"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Award, FileText } from 'lucide-react';

const TrackProgress = () => {
  // Sample complaint tracking data
  const [complaintDetails, setComplaintDetails] = useState({
    complaintId: 'CMP-2024-0345',
    subject: 'Network Connectivity Issue',
    currentStage: 'Investigation',
    stages: [
      {
        name: 'Complaint Registered',
        status: 'Completed',
        date: '2024-03-25T10:30:00',
        description: 'Complaint successfully logged in our system',
        department: 'Customer Support Desk',
        officer: 'Emily Rodriguez'
      },
      {
        name: 'Initial Assessment',
        status: 'Completed',
        date: '2024-03-26T14:45:00',
        description: 'Preliminary review of the complaint details',
        department: 'Technical Evaluation Team',
        officer: 'Michael Chen'
      },
      {
        name: 'Investigation',
        status: 'In Progress',
        date: '2024-03-27T09:15:00',
        description: 'Detailed investigation of reported network issues',
        department: 'Network Operations',
        officer: 'Sarah Thompson'
      },
      {
        name: 'Resolution Preparation',
        status: 'Pending',
        date: null,
        description: 'Developing solution based on investigation findings',
        department: 'Technical Solutions',
        officer: 'Not Assigned'
      },
      {
        name: 'Customer Confirmation',
        status: 'Pending',
        date: null,
        description: 'Verification of proposed solution with customer',
        department: 'Customer Engagement',
        officer: 'Not Assigned'
      }
    ]
  });

  // Function to get stage status icon
  const getStageIcon = (status) => {
    switch(status) {
      case 'Completed': return <Check className="text-green-500" />;
      case 'In Progress': return <Clock className="text-blue-500" />;
      case 'Pending': return <Award className="text-gray-400" />;
      default: return <FileText className="text-gray-300" />;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Awaiting Progress';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8"
        >
          {/* Complaint Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 mb-2">
              Complaint Tracking
            </h1>
            <div className="text-gray-400">
              <p>Complaint ID: {complaintDetails.complaintId}</p>
              <p className="font-semibold text-white">{complaintDetails.subject}</p>
            </div>
          </div>

          {/* Current Stage Highlight */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-700 rounded-xl p-4 mb-6 text-center"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              Current Stage: {complaintDetails.currentStage}
            </h2>
            <p className="text-gray-300">
              Our team is actively investigating your complaint and working towards a resolution.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700">
            {complaintDetails.stages.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-16 pb-8 last:pb-0"
              >
                {/* Stage Icon */}
                <div className="absolute left-0 top-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-900">
                  {getStageIcon(stage.status)}
                </div>

                {/* Stage Details */}
                <div className={`
                  rounded-xl p-4 
                  ${stage.status === 'Completed' 
                    ? 'bg-green-900/20 border-l-4 border-green-500' 
                    : stage.status === 'In Progress' 
                    ? 'bg-blue-900/20 border-l-4 border-blue-500'
                    : 'bg-gray-800 border-l-4 border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-white">{stage.name}</h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${stage.status === 'Completed' 
                        ? 'bg-green-500/30 text-green-300' 
                        : stage.status === 'In Progress' 
                        ? 'bg-blue-500/30 text-blue-300'
                        : 'bg-gray-500/30 text-gray-300'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{stage.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      <strong>Department:</strong> {stage.department}
                    </span>
                    <span>
                      <strong>Officer:</strong> {stage.officer}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {formatDate(stage.date)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackProgress;