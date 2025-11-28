import React from "react";
import AdminSidebar from "../Components/AdminSidebar";
("../Components/AdminSidebar");
import AdminTopbar from "../Components/AdminTopbar";
("../Components/AdminTopbar");
import AdminDashboard from "../Components/AdminDashboard";
import UserSidebar from "../Components/UserSidebar";
import UserTopbar from "../Components/UserTopbar";
import UserDashboard from "../Components/UserDashboard";
("../Components/AdminDashboard");
const Users = () => {
  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
        <UserTopbar />
        <UserDashboard />
      </div>
    </div>
  );
};

export default Users;
