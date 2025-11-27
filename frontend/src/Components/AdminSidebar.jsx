import React from "react";
import "../stylesheet/AdminSidebar.css";
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">AdminPanel</h2>

      <ul className="menu">
        <li className="active">
          <Link className="link-admin-sidebar" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/users">
            Users
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/zones">
            Zones
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/users">
            Officers
          </Link>
        </li>
        <li>
          <Link className="link-admin-sidebar" to="/admin/users">
            Complaints
          </Link>
        </li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
