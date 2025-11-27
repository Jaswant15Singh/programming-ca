import React from "react";
import "../stylesheet/AdminSidebar.css";
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">AdminPanel</h2>

      <ul className="menu">
        <Link className="link-admin-sidebar" to="/admin/dashboard">
          <li className="active">Dashboard</li>
        </Link>

        <Link className="link-admin-sidebar" to="/admin/users">
          <li>Users</li>
        </Link>

        <Link className="link-admin-sidebar" to="/admin/zones">
          <li>Zones</li>
        </Link>

        <Link className="link-admin-sidebar" to="/admin/officer">
          <li>Officers</li>
        </Link>

        <Link className="link-admin-sidebar" to="/admin/complaints">
          <li>Complaints</li>
        </Link>

        <li>Settings</li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
