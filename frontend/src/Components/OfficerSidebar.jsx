import React from "react";
import "../stylesheet/AdminSidebar.css";
import { NavLink } from "react-router-dom";

function OfficerSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Officer Panel</h2>

      <ul className="menu">
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/officer/dashboard"
        >
          <li>Dashboard</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/officer/users"
        >
          <li>Users</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/officer/complaints"
        >
          <li>Complaints</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default OfficerSidebar;
