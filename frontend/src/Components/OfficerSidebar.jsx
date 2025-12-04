import React from "react";
import "../stylesheet/AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function OfficerSidebar() {
  const navigate = useNavigate("");
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
          to="/officer/complaints"
        >
          <li>Complaints</li>
        </NavLink>
        <li
          onClick={() => {
            localStorage.removeItem("officer-token");
            navigate("/");
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default OfficerSidebar;
