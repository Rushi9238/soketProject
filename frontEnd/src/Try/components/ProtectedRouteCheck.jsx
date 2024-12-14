import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteCheck = () => {
  const authenticated = localStorage.getItem("user_logined");
  const isAdmin = localStorage.getItem("isAdmin");

  if (!authenticated) {
    // Redirect unauthenticated users to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  // If authenticated, allow access to nested routes
  if (isAdmin === "true" && window.location.pathname !== "/admin-page") {
    return <Navigate to="/admin-page" replace />;
  } else if (isAdmin !== "true" && window.location.pathname !== "/user-page") {
    return <Navigate to="/user-page" replace />;
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRouteCheck;
