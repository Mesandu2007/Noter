import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgot";
import Dashboard from "./pages/DashboardPage";
import ResetPassword from "./pages/Reset";
import NotesPage from "./pages/NotesPage";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLoginSuccess = (data) => {
    // Safely extract token and userId (handles nested or flat response)
    const token = data?.token;
    const userId = data?.user?._id || data?.userId || data?._id;

    if (token) localStorage.setItem("token", token);
    if (userId) localStorage.setItem("userId", userId);

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/notes" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/notes" replace /> : <Register />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <NotesPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route path="/reset/:token" element={<ResetPassword />} />

        {/* Catch-all route moved to the end to ensure it doesn't override specific paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}