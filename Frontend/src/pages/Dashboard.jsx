"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RaiseComplaint from "../components/dashboard/RaiseComplaint";
import Analytics from "../components/dashboard/Analytics";
import TrackProgress from "../components/dashboard/TrackProgress";
import Settings from "../components/dashboard/Settings";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Raise a Complaint");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Raise a Complaint":
        return <RaiseComplaint />;
      case "Analytics":
        return <Analytics />;
      case "Track Progress":
        return <TrackProgress />;
      case "Settings":
        return <Settings />;
      default:
        return <RaiseComplaint />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <Navbar isAuthenticated={true} onLogout={onLogout} />

      <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-400">Manage your complaints and track progress</p>
          </div>

          {/* Tabs */}
          <div className="mb-0 border-b border-gray-800">
            <nav className="flex space-x-8">
              {["Raise a Complaint", "Analytics", "Track Progress", "Settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
