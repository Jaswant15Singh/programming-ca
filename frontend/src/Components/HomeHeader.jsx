import React from "react";
import "../stylesheet/HomeHeader.css";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  return (
    <>
      <header className="header">
        <div className="header-overlay">
          <div className="header-content">
            <Link className="header-logo link" to="/">
              CricVoice
            </Link>

            <div className="header-buttons">
              <Link
                to="/admin-login"
                className="link"
                style={{ background: "red" }}
              >
                Admin Login
              </Link>
              <Link
                to="/resident-login"
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
