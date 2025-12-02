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

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin-token");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  try {
    const jwt = jwtDecode(token);
    console.log(jwt);
    return children;
  } catch (e) {
    console.log(e);

    return <Navigate to="/admin-login" replace />;
  }
}
function App() {
  const token = localStorage.getItem("user-token");
  const jwt = jwtDecode(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin-login" element={<AdminLogin />} />
        <Route exact path="/resident-login" element={<UserLogin />} />
        <Route exact path="/admin/dashboard" element={<Admin />} />
        <Route exact path="/admin/users" element={<AdminUserData />} />
        <Route exact path="/admin/zones" element={<Zones />} />
        <Route exact path="/admin/officer" element={<OffficerAdmin />} />
        <Route exact path="/admin/complaints" element={<Complaints />} />
        <Route exact path="/resident/dashboard" element={<Users />} />
        <Route
          exact
          path="/resident/complaints"
          element={<UserComplaints user_id={jwt.user_id} />}
        />
        <Route exact path="/resident/profile" element={<UserProfile />} />
        <Route exact path="/admin/dashboard" element={<Admin />} />
        <Route exact path="/officer/dashboard" element={<Officer />} />
        <Route
          exact
          path="/officer/complaints"
          element={<OfficerComplains />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
