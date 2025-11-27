import { jwtDecode } from "jwt-decode";
import "./App.css";
import Home from "./Pages/Home";
import UserLogin from "./Pages/UserLogin";
import AdminLogin from "./Pages/AdminLogin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import AdminUserData from "./Pages/AdminUserData";
import Zones from "./Pages/Zones";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin-login" element={<AdminLogin />} />
        <Route exact path="/resident-login" element={<UserLogin />} />
        <Route exact path="/admin/dashboard" element={<Admin />} />
        <Route exact path="/admin/users" element={<AdminUserData />} />
        <Route exact path="/admin/zones" element={<Zones />} />
        <Route
          exact
          path="/resident/dashboard"
          element={<>Resident Dashboard</>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
