import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
("../Components/AdminSidebar");
import AdminTopbar from "../Components/AdminTopbar";
("../Components/AdminTopbar");
import AdminDashboard from "../Components/AdminDashboard";
import UserSidebar from "../Components/UserSidebar";
("../Components/AdminDashboard");
const Users = () => {
  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
        <AdminTopbar />
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Users;
