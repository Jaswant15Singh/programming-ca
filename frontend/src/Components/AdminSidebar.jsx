import React, { useState } from "react";
import "../stylesheet/AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate("");
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <div>
      <h1
        className="hamburger"
        onClick={() => {
          setIsSidebar(!isSidebar);
        }}
      >
        ☰
      </h1>
      <div className={`${isSidebar ? "sidebar-open" : "sidebar"}`}>
        <p
          className="X"
          style={{ position: "absolute", left: "10px", top: "10px" }}
          onClick={() => {
            setIsSidebar(!isSidebar);
          }}
        >
          X
        </p>
        <h2 className="sidebar-logo">AdminPanel</h2>

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

          <li
            onClick={() => {
              localStorage.removeItem("admin-token");
              navigate("/");
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
