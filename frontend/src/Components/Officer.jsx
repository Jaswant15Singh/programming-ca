import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
("../Components/AdminSidebar");
import AdminTopbar from "../Components/AdminTopbar";
("../Components/AdminTopbar");
import AdminDashboard from "../Components/AdminDashboard";
import OfficerSidebar from "./officerSidebar";
import OfficerDashboard from "./OfficerDashboard";
("../Components/AdminDashboard");
const Officer = () => {
  return (
    <div className="admin-container">
      <OfficerSidebar />
      <div className="main-content">
        <AdminTopbar />
        <OfficerDashboard />
      </div>
    </div>
  );
};

export default Officer;
