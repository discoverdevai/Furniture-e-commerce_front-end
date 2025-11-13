import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;

  if (!token) {
    // Not logged in → redirect to login page
    return <Navigate to="/" replace />;
  }

  // Logged in → render the children component
  return children;
};
