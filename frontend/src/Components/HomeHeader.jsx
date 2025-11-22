import React from "react";
import "../stylesheet/HomeHeader.css";
const HomeHeader = () => {
  return (
    <>
      <header className="header">
        <div className="header-overlay">
          <div className="header-content">
            <h1 className="header-logo">My Website</h1>

            <div className="header-buttons">
              <button className="btn">Login</button>
              <button className="btn btn-outline">Register</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
