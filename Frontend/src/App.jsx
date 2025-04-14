"use client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // <-- NEW

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
    console.log("isAuthenticated: ", storedAuth);
    setLoading(false); // Set loading to false after checking authentication
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("Logging out...", localStorage.getItem("isAuthenticated"));
    localStorage.setItem("isAuthenticated", "false");
  localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logging out...", localStorage.getItem("isAuthenticated"));
    setIsAuthenticated(false);
  };

  if (loading) return null; // or a spinner, splash screen, etc.

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup onSignup={login} />
            )
          }
        />
        <Route path="/complaint-form" element={<ComplaintForm />} />
        <Route path="/track-progress" element={<TrackProgress />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={localStorage.getItem("isAuthenticated") === "true"}
            >
              <Dashboard onLogout={logout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
