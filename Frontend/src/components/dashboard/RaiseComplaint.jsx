"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RaiseComplaint = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      {/* Raise Complaint Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)} 
        className="bg-gradient-to-r from-pink-500 to-blue-500 px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        Raise a Complaint
      </motion.button>

      {/* Complaint Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gradient-to-br from-pink-900 to-blue-900 p-8 rounded-2xl shadow-2xl w-[450px] relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Complaint Process Explanation */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 mb-2">
                  Complaint Resolution Process
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  We're committed to addressing your concerns quickly and effectively. 
                  Your feedback helps us improve our services.
                </p>
              </div>

              {/* Complaint Form */}
              <form className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Complaint Subject
                  </label>
                  <input 
                    type="text" 
                    placeholder="Briefly describe the issue" 
                    className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Detailed Description
                  </label>
                  <textarea 
                    placeholder="Provide a comprehensive description of your complaint..." 
                    rows={4}
                    className="w-full p-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  ></textarea>
                </motion.div>

                {/* Submission Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex space-x-4"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Submit Complaint
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 p-3 rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </form>

              {/* Additional Info */}
              <div className="mt-6 text-center text-xs text-gray-400">
                <p>
                  We typically respond within 2-3 business days. 
                  Track your complaint status through our support portal.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RaiseComplaint;