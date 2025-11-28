import React from "react";
import "../stylesheet/AdminTopbar.css";

function UserTopbar() {
  return (
    <div className="topbar">
      <input className="search-box" placeholder="Search..." />

      <div className="topbar-icons">
        <img
          className="profile-img"
          src="https://i.pravatar.cc/40"
          alt="profile"
        />
      </div>
    </div>
  );
}

export default UserTopbar;
