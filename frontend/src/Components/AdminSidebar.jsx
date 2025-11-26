import React from "react";
import "../stylesheet/AdminSidebar.css";
function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">AdminPanel</h2>

      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>Users</li>
        <li>Analytics</li>
        <li>Orders</li>
        <li>Messages</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
