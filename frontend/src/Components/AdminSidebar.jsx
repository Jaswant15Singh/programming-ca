import React from "react";
import "../stylesheet/AdminSidebar.css";
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">AdminPanel</h2>

      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/dashboard/users">
            Users
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/dashboard/users">
            Zones
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/dashboard/users">
            Officers
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/dashboard/users">
            Complaints
          </Link>
        </li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
