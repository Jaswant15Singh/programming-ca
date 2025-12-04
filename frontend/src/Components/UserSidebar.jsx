import React from "react";
import "../stylesheet/AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function UserSidebar() {
  const navigate = useNavigate("");

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
        <li
          onClick={() => {
            localStorage.removeItem("user-token");
            navigate("/");
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;
