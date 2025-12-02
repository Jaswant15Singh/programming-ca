import React, { useState, useEffect } from "react";
import "../stylesheet/AdminDashboard.css";

function OfficerDashboard() {
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    const result = await Promise.all(
      [
        "http://localhost:5000/users/get-users",
        "http://localhost:5000/complaint/get-complaints",
        "http://localhost:5000/admin/get-zones",
        "http://localhost:5000/admin/get-all-officers",
      ].map(async (e) => {
        const result = await fetch(e);
        const data = await result.json();
        return data;
      })
    );

    setUsers(result[0]);
    setComplaints(result[1]);
    setZones(result[2]);
    setOfficers(result[3]);
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

        <div className="card">
          <h3>Zones</h3>
          <p className="value">{zones.length}</p>
        </div>

        <div className="card">
          <h3>Officers</h3>
          <p className="value">{officers.length}</p>
        </div>

        <div className="card">
          <h3>Complaints</h3>
          <p className="value">{complaints.length}</p>
        </div>
      </div>
    </div>
  );
}

export default OfficerDashboard;
