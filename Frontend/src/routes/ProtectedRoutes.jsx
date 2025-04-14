import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Please Login first")
      toast.warn("Please login to access this page", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
