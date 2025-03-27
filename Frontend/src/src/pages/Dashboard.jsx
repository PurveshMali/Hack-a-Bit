"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard
  const performanceData = {
    overall: 85,
    subjects: [
      { name: "Mathematics", score: 92, change: 5 },
      { name: "Science", score: 88, change: 3 },
      { name: "English", score: 78, change: -2 },
      { name: "History", score: 82, change: 4 },
    ],
    recentActivities: [
      { id: 1, type: "Quiz", subject: "Mathematics", score: "18/20", date: "2023-03-15" },
      { id: 2, type: "Assignment", subject: "Science", score: "92%", date: "2023-03-12" },
      { id: 3, type: "Exam", subject: "English", score: "78%", date: "2023-03-10" },
      { id: 4, type: "Project", subject: "History", score: "85%", date: "2023-03-08" },
    ],
    upcomingTasks: [
      { id: 1, title: "Mathematics Quiz", dueDate: "2023-03-20", priority: "High" },
      { id: 2, title: "Science Lab Report", dueDate: "2023-03-22", priority: "Medium" },
      { id: 3, title: "English Essay", dueDate: "2023-03-25", priority: "High" },
      { id: 4, title: "History Presentation", dueDate: "2023-03-28", priority: "Low" },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Background lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 flex items-top justify-end">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500 blur-[100px] opacity-30"></div>
        <div className="absolute top-3/4 left-1/3 w-80 h-80 rounded-full bg-blue-500 blur-[100px] opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-green-500 blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-yellow-500 blur-[100px] opacity-30"></div>
        <h1 className="text-9xl text-red-700 font-bold mx-10 my-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">Be Among Us</h1>
      </div>

      <Navbar isAuthenticated={true} onLogout={onLogout} />

      <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Student</h1>
            <p className="text-gray-400">Here's an overview of your academic performance</p>
          </div>

          {/* Dashboard Tabs */}
          <div className="mb-8 border-b border-gray-800">
            <nav className="flex space-x-8">
              {["overview", "subjects", "tasks", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Performance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-medium mb-4">Overall Performance</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#444"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeDasharray={`${performanceData.overall}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{performanceData.overall}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-medium mb-4">Study Time</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">This Week</span>
                        <span className="text-sm font-medium">12.5 hrs</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Last Week</span>
                        <span className="text-sm font-medium">10 hrs</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Goal</span>
                        <span className="text-sm font-medium">15 hrs</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-medium mb-4">Upcoming Tasks</h3>
                  <ul className="space-y-3">
                    {performanceData.upcomingTasks.slice(0, 3).map((task) => (
                      <li key={task.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === "High"
                              ? "bg-red-500/20 text-red-500"
                              : task.priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Subject Performance */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-medium mb-4">Subject Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Change
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {performanceData.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{subject.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{subject.score}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center ${
                                subject.change > 0 ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {subject.change > 0 ? "+" : ""}
                              {subject.change}%
                              {subject.change > 0 ? (
                                <svg
                                  className="w-4 h-4 ml-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 15l7-7 7 7"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4 ml-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  ></path>
                                </svg>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                subject.score >= 90
                                  ? "bg-green-500/20 text-green-500"
                                  : subject.score >= 80
                                    ? "bg-blue-500/20 text-blue-500"
                                    : subject.score >= 70
                                      ? "bg-yellow-500/20 text-yellow-500"
                                      : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {subject.score >= 90
                                ? "Excellent"
                                : subject.score >= 80
                                  ? "Good"
                                  : subject.score >= 70
                                    ? "Average"
                                    : "Needs Improvement"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {performanceData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                        {activity.type.charAt(0)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {activity.type} - {activity.subject}
                          </p>
                          <p className="text-sm text-gray-400">{activity.date}</p>
                        </div>
                        <p className="text-sm text-gray-400">Score: {activity.score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "overview" && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-12 border border-gray-800 text-center">
              <h3 className="text-xl font-medium mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
              </h3>
              <p className="text-gray-400">This section is under development. Check back soon for updates!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard

