import { React, useState } from "react";
import "../stylesheet/AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function UserSidebar() {
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
    </div>
  );
}

export default UserSidebar;
