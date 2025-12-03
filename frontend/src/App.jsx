import { jwtDecode } from "jwt-decode";
import "./App.css";
import Home from "./Pages/Home";
import UserLogin from "./Pages/UserLogin";
import AdminLogin from "./Pages/AdminLogin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import AdminUserData from "./Pages/AdminUserData";
import Zones from "./Pages/Zones";
import OffficerAdmin from "./Pages/OfficerAdmin";
import Complaints from "./Pages/Complaints";
import Users from "./Pages/Users";
import UserComplaints from "./Pages/UserComplaints";
import UserProfile from "./Pages/UserProfile";
import Officer from "./Pages/Officer";
import OfficerComplains from "./Pages/OfficerComplains";

// Protected Route Component with Role-Based Access Control
function ProtectedRoute({ children, allowedRoles }) {
  const getTokenAndRole = () => {
    // Check for admin token
    const adminToken = localStorage.getItem("admin-token");
    if (adminToken) {
      try {
        const decoded = jwtDecode(adminToken);
        return { token: adminToken, decoded, role: "admin" };
      } catch (e) {
        console.error("Invalid admin token:", e);
      }
    }

    // Check for user token
    const userToken = localStorage.getItem("user-token");
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        return { token: userToken, decoded, role: decoded.role || "user" };
      } catch (e) {
        console.error("Invalid user token:", e);
      }
    }

    // Check for officer token
    const officerToken = localStorage.getItem("officer-token");
    if (officerToken) {
      try {
        const decoded = jwtDecode(officerToken);
        return { token: officerToken, decoded, role: "officer" };
      } catch (e) {
        console.error("Invalid officer token:", e);
      }
    }

    return null;
  };

  const auth = getTokenAndRole();

  // No valid token found
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  // Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // Redirect to appropriate dashboard based on role
    switch (auth.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "officer":
        return <Navigate to="/officer/dashboard" replace />;
      case "user":
        return <Navigate to="/resident/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}

function App() {
  // Helper function to get user data safely
  const getUserData = () => {
    try {
      const token = localStorage.getItem("user-token");
      if (token) {
        return jwtDecode(token);
      }
    } catch (e) {
      console.error("Error decoding user token:", e);
    }
    return null;
  };

  const userData = getUserData();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/resident-login" element={<UserLogin />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUserData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/zones"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Zones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/officer"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <OffficerAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Complaints />
            </ProtectedRoute>
          }
        />

        {/* Resident/User Protected Routes */}
        <Route
          path="/resident/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resident/complaints"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserComplaints user_id={userData?.user_id} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resident/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserProfile user_id={userData?.user_id} />
            </ProtectedRoute>
          }
        />

        {/* Officer Protected Routes */}
        <Route
          path="/officer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <Officer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer/complaints"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <OfficerComplains />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
