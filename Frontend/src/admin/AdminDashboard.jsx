"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Users,
  AlertTriangle,
  X,
  PlusCircle,
  MapPin,
  FileText,
  Phone,
  User,
  Tag,
  ChevronRight,
  RefreshCcw,
  Send,
} from "lucide-react";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [recruitmentForm, setRecruitmentForm] = useState({
    skills: "",
    numberOfWorkers: 1,
    workAddress: "",
    dateFrom: "",
    dateTo: "",
    wagePerDay: "",
    contactNumber: "",
    additionalDetails: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const fetchComplaints = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/get-complaints",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComplaints(res.data);

      // Calculate statistics
      const stats = {
        total: res.data.length,
        pending: res.data.filter((c) => c.status === "pending").length,
        inProgress: res.data.filter((c) => c.status === "in-progress").length,
        completed: res.data.filter((c) => c.status === "completed").length,
      };

      setStats(stats);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
      showNotification("Failed to fetch complaints", "error");
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      await axios.patch(
        `http://localhost:5000/api/admin/complaints/update-status/${selectedComplaint.complaintId}`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints(); // refresh data
      setShowComplaintModal(false); // close modal
      showNotification("Status updated successfully", "success");
    } catch (err) {
      console.error("Failed to update status:", err);
      showNotification("Failed to update status", "error");
    }
  };

  const handleRecruitmentSubmit = async () => {
    // Validate form
    if (
      !recruitmentForm.skills ||
      !recruitmentForm.workAddress ||
      !recruitmentForm.dateFrom ||
      !recruitmentForm.dateTo ||
      !recruitmentForm.wagePerDay ||
      !recruitmentForm.contactNumber
    ) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    const token = localStorage.getItem("adminToken");

    try {
      // Prepare email content from form
      const emailPayload = {
        subject: "New Job Opportunity - Workers Needed",
        message: `
          <h2>New Job Recruitment Details</h2>
          <p><strong>Skills Required:</strong> ${recruitmentForm.skills}</p>
          <p><strong>Number of Workers:</strong> ${
            recruitmentForm.numberOfWorkers
          }</p>
          <p><strong>Work Address:</strong> ${recruitmentForm.workAddress}</p>
          <p><strong>Date From:</strong> ${recruitmentForm.dateFrom}</p>
          <p><strong>Date To:</strong> ${recruitmentForm.dateTo}</p>
          <p><strong>Wage Per Day:</strong> ₹${recruitmentForm.wagePerDay}</p>
          <p><strong>Contact Number:</strong> ${
            recruitmentForm.contactNumber
          }</p>
          ${
            recruitmentForm.additionalDetails &&
            `<p><strong>Additional Details:</strong> ${recruitmentForm.additionalDetails}</p>`
          }
        `,
      };

      await axios.post(
        "http://localhost:5000/api/email/send-email-to-all",
        emailPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Reset form & close modal
      setShowRecruitmentModal(false);
      setRecruitmentForm({
        skills: "",
        numberOfWorkers: 1,
        workAddress: "",
        dateFrom: "",
        dateTo: "",
        wagePerDay: "",
        contactNumber: "",
        additionalDetails: "",
      });

      showNotification("Recruitment email sent successfully", "success");
    } catch (err) {
      console.error("Failed to send recruitment email:", err);
      showNotification("Failed to send email", "error");
    }
  };

  const handleRecruitmentFormChange = (e) => {
    const { name, value } = e.target;
    setRecruitmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(
    (c) => filter === "All" || c.status === filter
  );

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <RefreshCcw className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 text-white">
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300`}
        >
          {notification.type === "error" ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Admin Complaint Dashboard
          </h1>

          <button
            onClick={() => setShowRecruitmentModal(true)}
            className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white font-bold py-2 px-6 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            <Users className="w-5 h-5" />
            <span>Post Worker Recruitment</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Complaints</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <RefreshCcw className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-800 p-4 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Filter className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Filter Complaints:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "pending", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === status
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                {status === "All"
                  ? "All"
                  : status.charAt(0).toUpperCase() +
                    status.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>

          <button
            onClick={fetchComplaints}
            className="mt-4 md:mt-0 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Complaints Grid */}
        {filteredComplaints.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Complaints Found</h3>
            <p className="text-gray-400">
              There are no complaints matching your current filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredComplaints.map((complaint, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedComplaint(complaint);
                  setUpdatedStatus(complaint.status);
                  setShowComplaintModal(true);
                }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div
                  className={`h-2 ${getStatusColor(complaint.status)}`}
                ></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold truncate pr-2">
                      {complaint.name}
                    </h2>
                    <div
                      className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
                        complaint.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : complaint.status === "in-progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span>{complaint.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <Tag className="w-4 h-4" />
                    <span>{complaint.natureOfIssue}</span>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {complaint.description}
                  </p>

                  <div className="text-right">
                    <span className="inline-flex items-center text-blue-400 text-sm">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complaint Details Modal */}
      {showComplaintModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div
              className={`h-2 w-full ${getStatusColor(
                selectedComplaint.status
              )}`}
            ></div>
            <button
              onClick={() => setShowComplaintModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
                Complaint Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">
                      Complainant Name
                    </label>
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {selectedComplaint.name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-1">
                      Mobile Number
                    </label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {selectedComplaint.mobileNumber}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-1">
                      Nature of Issue
                    </label>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {selectedComplaint.natureOfIssue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">
                      Address
                    </label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {selectedComplaint.address}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-1">
                      Priority
                    </label>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {selectedComplaint.priority}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-1">
                      Days to Resolve
                    </label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">
                        {selectedComplaint.daysToResolve}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-400 text-sm block mb-1">
                  Description
                </label>
                <p className="bg-gray-700/50 p-3 rounded-lg">
                  {selectedComplaint.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    Problem Image
                  </label>
                  <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                    <img
                      src={selectedComplaint.problemImageUrl}
                      alt="Problem"
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Image+Not+Available";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    Supporting Document
                  </label>
                  <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                    <img
                      src={selectedComplaint.supportingDocUrl}
                      alt="Document"
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Document+Not+Available";
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Update Status</h3>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="bg-gray-700 p-2 px-4 rounded-lg border border-gray-600 focus:border-blue-500 outline-none w-full md:w-auto"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={handleStatusChange}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-lg w-full md:w-auto flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Update Status</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recruitment Modal */}
      {showRecruitmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="h-2 w-full bg-green-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-700">
                <h2 className="text-2xl font-bold flex items-center">
                  <Users className="w-6 h-6 mr-2 text-green-500" />
                  Post Worker Recruitment
                </h2>
                <button
                  onClick={() => setShowRecruitmentModal(false)}
                  className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Worker Skills/Job Type*
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={recruitmentForm.skills}
                    onChange={handleRecruitmentFormChange}
                    placeholder="e.g. Construction, Carpentry, Plumbing"
                    className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Number of Workers*
                  </label>
                  <input
                    type="number"
                    name="numberOfWorkers"
                    value={recruitmentForm.numberOfWorkers}
                    onChange={handleRecruitmentFormChange}
                    min="1"
                    className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-1">
                  Work Address*
                </label>
                <input
                  type="text"
                  name="workAddress"
                  value={recruitmentForm.workAddress}
                  onChange={handleRecruitmentFormChange}
                  placeholder="Complete address where work will be performed"
                  className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={recruitmentForm.dateFrom}
                    onChange={handleRecruitmentFormChange}
                    className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    End Date*
                  </label>
                  <input
                    type="date"
                    name="dateTo"
                    value={recruitmentForm.dateTo}
                    onChange={handleRecruitmentFormChange}
                    className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Wage per Day (₹)*
                  </label>
                  <input
                    type="number"
                    name="wagePerDay"
                    value={recruitmentForm.wagePerDay}
                    onChange={handleRecruitmentFormChange}
                    placeholder="e.g. 500"
                    className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={recruitmentForm.contactNumber}
                    onChange={handleRecruitmentFormChange}
                    placeholder="Contact number for workers to reach out"
                    className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-1">
                  Additional Details
                </label>
                <textarea
                  name="additionalDetails"
                  value={recruitmentForm.additionalDetails}
                  onChange={handleRecruitmentFormChange}
                  placeholder="Any other details about the job, requirements, or instructions"
                  rows={4}
                  className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:border-green-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="text-right">
                <button
                  onClick={handleRecruitmentSubmit}
                  className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 px-8 rounded-lg flex items-center space-x-2 ml-auto"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Recruitment Notification</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
