"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Edit2, 
  Shield, 
  LogOut 
} from 'lucide-react';

const Settings = () => {
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    username: 'johnd',
    profilePicture: '/api/placeholder/200/200'
  });

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

  const renderProfileSection = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img 
            src={userData.profilePicture} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600"
          />
          <button className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{userData.fullName}</h2>
          <p className="text-gray-400">{userData.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center space-x-2 mb-2">
            <User className="w-5 h-5 text-indigo-600" />
            <span>Full Name</span>
          </label>
          {editMode.name ? (
            <div className="flex space-x-2">
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <button 
                onClick={() => setEditMode(prev => ({...prev, name: false}))}
                className="bg-indigo-600 px-3 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{userData.fullName}</p>
              <button onClick={() => setEditMode(prev => ({...prev, name: true}))}>
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-2 mb-2">
            <Mail className="w-5 h-5 text-indigo-600" />
            <span>Email Address</span>
          </label>
          {editMode.email ? (
            <div className="flex space-x-2">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <button 
                onClick={() => setEditMode(prev => ({...prev, email: false}))}
                className="bg-indigo-600 px-3 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{userData.email}</p>
              <button onClick={() => setEditMode(prev => ({...prev, email: true}))}>
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderSecuritySection = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <label className="flex items-center space-x-2 mb-2">
          <Lock className="w-5 h-5 text-red-500" />
          <span>Change Password</span>
        </label>
        <div className="space-y-4">
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="w-full p-2 bg-gray-700 rounded-md"
          />
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="w-full p-2 bg-gray-700 rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm New Password"
            className="w-full p-2 bg-gray-700 rounded-md"
          />
          <button className="bg-indigo-600 px-4 py-2 rounded-md">
            Update Password
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
          Account Settings
        </h1>

        <div className="flex space-x-8">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-gray-800 rounded-xl p-4 space-y-2 h-fit">
            {[
              { icon: <User />, label: 'Profile', value: 'profile' },
              { icon: <Shield />, label: 'Security', value: 'security' }
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveSection(item.value)}
                className={`w-full flex items-center space-x-2 p-2 rounded-md ${
                  activeSection === item.value 
                    ? 'bg-indigo-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="border-t border-gray-700 pt-4 mt-4">
              <button className="w-full flex items-center space-x-2 p-2 text-red-500 hover:bg-red-500/10 rounded-md">
                <LogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-800 rounded-xl p-6">
            {activeSection === 'profile' && renderProfileSection()}
            {activeSection === 'security' && renderSecuritySection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;