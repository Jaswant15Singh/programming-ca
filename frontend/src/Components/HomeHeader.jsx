import React from "react";
import "../stylesheet/HomeHeader.css";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  return (
    <>
      <header className="header">
        <div className="header-overlay">
          <div className="header-content">
            <h1 className="header-logo">My Website</h1>

            <div className="header-buttons">
              <Link
                to="/admin-login"
                className="link"
                style={{ background: "red" }}
              >
                Admin Login
              </Link>
              <Link
                to="/user-login"
                className="link"
                style={{ background: "yellow" }}
              >
                Resident Login
              </Link>{" "}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
