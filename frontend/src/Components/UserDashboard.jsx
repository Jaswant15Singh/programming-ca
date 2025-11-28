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
      [`http://localhost:5000/complaint/get-complaints-by-user/${user_id}`].map(
        async (e) => {
          const result = await fetch(e);
          const data = await result.json();
          return data;
        }
      )
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

      {/* <div className="chart-section">
        <div className="chart-box">Chart Placeholder</div>
        <div className="chart-box">Statistics Placeholder</div>
      </div>

      <div className="table-section">
        <h2>Recent Activities</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Jaswant</td>
              <td>Created new report</td>
              <td>Today</td>
            </tr>

            <tr>
              <td>Rohan</td>
              <td>Updated product details</td>
              <td>Yesterday</td>
            </tr>

            <tr>
              <td>Meera</td>
              <td>Added new user</td>
              <td>2 days ago</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default UserDashboard;
