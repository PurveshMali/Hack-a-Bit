"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Edit2, 
  Shield, 
  LogOut, 
  Camera,
  Save,
  X,
  Eye,
  EyeOff,
  AlertTriangle,
  Check
} from 'lucide-react';
import axios from 'axios';

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    username: false
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  // Get token (assuming it's stored in localStorage)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch user data
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios.get("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      console.log("User data:", res.data);
      const { email, name, profilePicture } = res.data;
      setUserData({
        email,
        name,
        profilePicture: profilePicture || 'https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif'
      });
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching user data:", err.response?.data || err.message);
      showNotification("Failed to load user data", "error");
      setLoading(false);
    });
  }, [token]);

  const showNotification = (message, type = 'success') => {
    setNotifications({ message, type });
    setTimeout(() => setNotifications({ message: '', type: '' }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const saveProfileField = (field) => {
    // In a real app, this would make an API call
    setEditMode(prev => ({...prev, [field]: false}));
    showNotification(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
  };

  const updatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification("All password fields are required", "error");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showNotification("New passwords don't match", "error");
      return;
    }

    // In a real app, this would make an API call
    showNotification("Password updated successfully!");
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    // In a real app, this would clear auth state and redirect
    console.log("Logging out");
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    showNotification("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading your settings...</p>
        </div>
      </div>
    );
  }

  if (!userData && !loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-xl max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Session Expired</h2>
          <p className="mb-4 text-gray-400">Please log in again to access your settings</p>
          <button className="bg-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: <User className="w-5 h-5" />, label: 'Profile', value: 'profile' },
    { icon: <Shield className="w-5 h-5" />, label: 'Security', value: 'security' }
  ];

  const renderProfileSection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative group">
          <img 
            src={userData.profilePicture} 
            alt="Profile" 
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-600 transition-all duration-300 group-hover:border-purple-500"
          />
          <button className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 transition-transform duration-300 transform group-hover:scale-110">
            <Camera className="w-4 h-4" />
          </button>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">Change Photo</span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            {userData.fullName}
          </h2>
          <p className="text-gray-400">{userData.email}</p>
          <p className="text-sm text-indigo-400 mt-2">@{userData.name}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-gray-700/30 p-4 rounded-lg"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <label className="flex items-center space-x-2 mb-3">
            <User className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Full Name</span>
          </label>
          {editMode.name ? (
            <div className="space-y-3">
              <input
                type="text"
                name="fullName"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setEditMode(prev => ({...prev, name: false}))}
                  className="flex items-center space-x-1 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button 
                  onClick={() => saveProfileField('name')}
                  className="flex items-center space-x-1 bg-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-lg">{userData.fullName}</p>
              <button 
                onClick={() => setEditMode(prev => ({...prev, name: true}))}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Edit name"
              >
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="bg-gray-700/30 p-4 rounded-lg"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <label className="flex items-center space-x-2 mb-3">
            <Mail className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Email Address</span>
          </label>
          {editMode.email ? (
            <div className="space-y-3">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setEditMode(prev => ({...prev, email: false}))}
                  className="flex items-center space-x-1 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button 
                  onClick={() => saveProfileField('email')}
                  className="flex items-center space-x-1 bg-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-lg">{userData.email}</p>
              <button 
                onClick={() => setEditMode(prev => ({...prev, email: true}))}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Edit email"
              >
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  const renderSecuritySection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-gray-700/30 p-6 rounded-lg">
        <h3 className="flex items-center space-x-2 text-xl font-semibold mb-4">
          <Lock className="w-5 h-5 text-indigo-400" />
          <span>Change Password</span>
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="text-sm text-gray-400 block mb-1">Current Password</label>
            <div className="relative">
              <input
                type={passwordVisibility.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                className="w-full p-2 pl-3 pr-10 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {passwordVisibility.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-400 block mb-1">New Password</label>
            <div className="relative">
              <input
                type={passwordVisibility.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full p-2 pl-3 pr-10 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {passwordVisibility.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-400 block mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={passwordVisibility.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="w-full p-2 pl-3 pr-10 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {passwordVisibility.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formData.newPassword && formData.confirmPassword && 
              formData.newPassword !== formData.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
              )
            }
          </div>

          <button 
            onClick={updatePassword}
            className="w-full bg-indigo-600 px-4 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Account Settings
        </h1>

        {/* Notification Toast */}
        <AnimatePresence>
          {notifications.message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
                notifications.type === 'error' ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              {notifications.type === 'error' ? 
                <AlertTriangle className="w-5 h-5" /> : 
                <Check className="w-5 h-5" />
              }
              <span>{notifications.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          {/* Mobile Navigation */}
          <div className="md:hidden flex bg-gray-800 rounded-xl overflow-hidden">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveSection(item.value)}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 ${
                  activeSection === item.value 
                    ? 'bg-indigo-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden md:block w-64 bg-gray-800 rounded-xl p-4 space-y-2 h-fit shadow-lg">
            {navItems.map((item) => (
              <motion.button
                key={item.value}
                onClick={() => setActiveSection(item.value)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                  activeSection === item.value 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}

            <div className="border-t border-gray-700 pt-4 mt-4">
              <motion.button 
                className="w-full flex items-center space-x-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg">
            <AnimatePresence mode="wait">
              {activeSection === 'profile' && renderProfileSection()}
              {activeSection === 'security' && renderSecuritySection()}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Logout Button */}
        <div className="md:hidden mt-4">
          <button 
            className="w-full flex items-center justify-center space-x-2 p-3 text-red-400 bg-gray-800 hover:bg-red-500/10 rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;