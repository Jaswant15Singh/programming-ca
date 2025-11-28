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
          to="/admin/dashboard"
        >
          <li>Dashboard</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/admin/users"
        >
          <li>Users</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/admin/zones"
        >
          <li>Zones</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/admin/officer"
        >
          <li>Officers</li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-admin-sidebar active" : "link-admin-sidebar"
          }
          to="/admin/complaints"
        >
          <li>Complaints</li>
        </NavLink>

        <li>Settings</li>
      </ul>
    </div>
  );
}

export default UserSidebar;
