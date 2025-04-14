"use client";

import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RaiseComplaint from "../components/dashboard/RaiseComplaint";
import Analytics from "../components/dashboard/Analytics";
import TrackProgress from "../components/dashboard/TrackProgress";
import Settings from "../components/dashboard/Settings";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Raise a Complaint");
  const [complaintId, setComplaintId] = useState(null);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Renders the content based on the currently active tab.
 * 
 * Depending on the value of `activeTab`, this function will return 
 * the corresponding component to be rendered. The possible components 
 * are: RaiseComplaint, Analytics, TrackProgress, and Settings.
 * If the `activeTab` does not match any known case, it defaults to 
 * rendering the RaiseComplaint component.
 */

/******  bc680b3f-8887-4d3a-b950-c9dde702a159  *******/
  const renderTabContent = () => {
    switch (activeTab) {
      case "Raise a Complaint":
        return <RaiseComplaint />;
      case "Analytics":
        return <Analytics setActiveTab={setActiveTab} setComplaintId={setComplaintId}/>;
      case "Track Progress":
        return <TrackProgress  complaintId={complaintId}/>;
      case "Settings":
        return <Settings />;
      default:
        return <RaiseComplaint />;
    }
  };
  const lightingEffectsRef = useRef(null)
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <Navbar isAuthenticated={true} onLogout={onLogout} />
      <div ref={lightingEffectsRef} className="fixed inset-0 pointer-events-none z-0 opacity-50 flex items-top justify-center">
        <div className="light absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500 blur-[100px] opacity-30"></div>
        <div className="light absolute top-3/4 left-1/3 w-80 h-80 rounded-full bg-blue-500 blur-[100px] opacity-30"></div>
        <div className="light absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-green-500 blur-[100px] opacity-30"></div>
        <div className="light absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-yellow-500 blur-[100px] opacity-30"></div>
        <h1 className="text-9xl font-bold mx-10 my-15 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 opacity-50">Be Among Us</h1>
      </div>
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
