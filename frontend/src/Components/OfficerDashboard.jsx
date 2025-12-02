import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../stylesheet/AdminDashboard.css";

function OfficerDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    const token = localStorage.getItem("officer-token");
    const officer_id = jwtDecode(token).officer_id;
    console.log(officer_id);

    const data = await fetch(
      "http://localhost:5000/officer/complaints-by-officers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ officer_id }),
      }
    );
    const result = await data.json();
    console.log(result);

    setUsers(result.data);
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <p className="value">{users.length}</p>
        </div>
      </div>
    </div>
  );
}

export default OfficerDashboard;
