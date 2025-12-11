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

function UserRoute({ children }) {
  const token = localStorage.getItem("user-token");

  if (!token) return <Navigate to="/" replace />;

  try {
    jwtDecode(token);
    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("admin-token");

  if (!token) return <Navigate to="/" replace />;

  try {
    jwtDecode(token);
    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
}

function OfficerRoute({ children }) {
  const token = localStorage.getItem("officer-token");

  if (!token) return <Navigate to="/" replace />;

  try {
    jwtDecode(token);
    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
}
function App() {
  const getUserData = () => {
    try {
      const token = localStorage.getItem("user-token");
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  };

  const userData = getUserData();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/resident-login" element={<UserLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUserData />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/zones"
          element={
            <AdminRoute>
              <Zones />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/officer"
          element={
            <AdminRoute>
              <OffficerAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <AdminRoute>
              <Complaints />
            </AdminRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/resident/dashboard"
          element={
            <UserRoute>
              <Users />
            </UserRoute>
          }
        />
        <Route
          path="/resident/complaints"
          element={
            <UserRoute>
              <UserComplaints />
            </UserRoute>
          }
        />
        <Route
          path="/resident/profile"
          element={
            <UserRoute>
              <UserProfile user_id={userData?.user_id} />
            </UserRoute>
          }
        />

        {/* Officer Routes */}
        <Route
          path="/officer/dashboard"
          element={
            <OfficerRoute>
              <Officer />
            </OfficerRoute>
          }
        />
        <Route
          path="/officer/complaints"
          element={
            <OfficerRoute>
              <OfficerComplains />
            </OfficerRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
