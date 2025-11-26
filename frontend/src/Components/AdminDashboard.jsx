import React from "react";
import "../stylesheet/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <p className="value">1,245</p>
        </div>

        <div className="card">
          <h3>Active Orders</h3>
          <p className="value">312</p>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p className="value">$8,540</p>
        </div>

        <div className="card">
          <h3>Pending Tasks</h3>
          <p className="value">19</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <div className="chart-box">Chart Placeholder</div>
        <div className="chart-box">Statistics Placeholder</div>
      </div>

      {/* Recent Table */}
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
      </div>
    </div>
  );
}

export default AdminDashboard;
