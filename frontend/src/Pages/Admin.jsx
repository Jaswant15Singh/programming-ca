import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
("../Components/AdminSidebar");
import AdminTopbar from "../Components/AdminTopbar";
("../Components/AdminTopbar");
import AdminDashboard from "../Components/AdminDashboard";
("../Components/AdminDashboard");
const Admin = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminTopbar />
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
