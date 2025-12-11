import React, { useState, useEffect } from "react";
import "../stylesheet/AdminDashboard.css";
import { jwtDecode } from "jwt-decode";

function UserDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token_id = localStorage.getItem("user-token");
    const { user_id } = jwtDecode(token_id);

    getAllData(user_id);
  }, []);

  async function getAllData(user_id) {
    const result = await Promise.all(
      [
        `https://programming-ca.onrender.com/complaint/get-complaints-by-user/${user_id}`,
      ].map(async (e) => {
        const result = await fetch(e);
        const data = await result.json();
        return data;
      })
    );
    setComplaints(result[0]);
  }
  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h3>Complaints</h3>
          <p className="value">{complaints.length}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
