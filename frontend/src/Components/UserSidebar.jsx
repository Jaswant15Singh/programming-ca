import React from "react";
import "../stylesheet/AdminSidebar.css";
import { NavLink } from "react-router-dom";

function UserSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">User Panel</h2>

      <ul className="menu">
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/resident/dashboard"
        >
          <li>Dashboard</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/resident/complaints"
        >
          <li>Complaints</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/resident/profile"
        >
          <li>Profile</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default UserSidebar;
