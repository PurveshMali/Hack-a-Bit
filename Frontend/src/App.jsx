"use client";

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, MessageCircle } from "lucide-react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ComplaintForm from "./components/dashboard/ComplaintForm";
import TrackProgress from "./components/dashboard/TrackProgress";

const RaiseComplaint = () => {
  const navigate = useNavigate();

  const handleRaiseComplaint = () => {
    navigate("/complaint-form");
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative">
      <div className="container mx-auto px-4 z-10 relative max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 space-y-6"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 mb-4 text-center">
            Complaint Resolution Portal
          </h1>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Shield className="text-blue-400 w-12 h-12" />
              <div>
                <h3 className="font-semibold text-lg">Secure & Confidential</h3>
                <p className="text-gray-400 text-sm">
                  Your complaints are handled with utmost privacy and security.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Clock className="text-green-400 w-12 h-12" />
              <div>
                <h3 className="font-semibold text-lg">Quick Resolution</h3>
                <p className="text-gray-400 text-sm">
                  We aim to address your concerns within 48-72 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MessageCircle className="text-pink-400 w-12 h-12" />
              <div>
                <h3 className="font-semibold text-lg">Transparent Communication</h3>
                <p className="text-gray-400 text-sm">
                  Regular updates on your complaint status.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-300 italic text-sm text-center">
            "Your feedback is our opportunity to improve and serve you better."
          </p>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRaiseComplaint}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-pink-500 to-blue-500 px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Raise a Complaint
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup onSignup={login} />} />
        <Route path="/complaint-form" element={<ComplaintForm />} />
        <Route path="/track-progress" element={<TrackProgress />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard onLogout={logout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
