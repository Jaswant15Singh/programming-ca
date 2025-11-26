import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import AdminSidebar from "../Components/AdminSidebar";
import AdminTopbar from "../Components/AdminTopbar";
import "../stylesheet/AdminDashboard.css";

const AdminUserData = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("http://localhost:5000/users/get-users");
    const data = await res.json();
    setUsers(data);
  }

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(users.length / recordsPerPage);

  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <div className="main-content">
          <AdminTopbar />

          <div className="dashboard">
            <h2 className="mb-3">All Users</h2>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>address</th>
                  <th>Created date</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((u, i) => (
                  <tr key={i}>
                    <td>{firstIndex + i + 1}</td>
                    <td>{u.user_name}</td>
                    <td>{u.login_username}</td>
                    <td>{u.user_email}</td>
                    <td>{u.user_contact}</td>
                    <td>{u.user_address}</td>
                    <td>{u.created_date.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="mt-3">
              <Pagination.Prev
                onClick={prevPage}
                disabled={currentPage === 1}
              />

              {pageNumbers.map((num) => (
                <Pagination.Item
                  key={num}
                  active={num === currentPage}
                  onClick={() => changePage(num)}
                >
                  {num}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={nextPage}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserData;
