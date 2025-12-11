import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import AdminSidebar from "../Components/AdminSidebar";
import AdminTopbar from "../Components/AdminTopbar";
import "../stylesheet/AdminDashboard.css";
import ComplainAdd from "../Components/UpdateComplain";
import OfficerSidebar from "../Components/OfficerSidebar";

const OfficerComplains = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [off_id, setOff_id] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const recordsPerPage = 5;

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return user.complaint?.toLowerCase().includes(query);
  });
  useEffect(() => {
    fetchUsers();
  }, [fetching]);

  async function fetchUsers() {
    const token = localStorage.getItem("officer-token");
    const officer_id = jwtDecode(token).officer_id;
    setOff_id(officer_id);
    const res = await fetch(
      "https://programming-ca.onrender.com/officer/complaints-by-officers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ officer_id }),
      }
    );
    const data = await res.json();
    setUsers(data.data);
    console.log(data.data);
  }

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

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
        <OfficerSidebar />
        <div className="main-content">
          <AdminTopbar />

          <div className="dashboard">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  maxWidth: "500px",
                  padding: "10px",
                  fontSize: "14px",
                }}
              />
            </div>
            <br />
            <br />
            <h2 className="mb-3">All Complaints</h2>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Complaint</th>
                  <th>User</th>
                  <th>Images</th>
                  <th>Status</th>
                  <th>Complaint date</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((u, i) => (
                  <tr key={i}>
                    <td>{firstIndex + i + 1}</td>
                    <td>{u.complaint}</td>
                    <td>{u.user_name}</td>
                    <td style={{ maxHeight: "100px", overflowY: "scroll" }}>
                      {u.complaint_images.map((e) => (
                        <img
                          src={`https://programming-ca.onrender.com/${e}`.replace(
                            "/public",
                            ""
                          )}
                          height="100px"
                          width="100px"
                          alt={e}
                          style={{ display: "block" }}
                        />
                      ))}
                    </td>
                    <td>{u.status}</td>
                    <td>{new Date(u.complaint_date).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={async () => {
                          const isConfirm = confirm("Are you sure?");
                          if (u.status === "resolved") {
                            alert("Already resolved");
                            return;
                          }
                          if (isConfirm) {
                            try {
                              const result = await fetch(
                                "https://programming-ca.onrender.com/officer/update-complaints-by-officers",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    officer_id: off_id,
                                    complaint_id: u.complaint_id,
                                  }),
                                }
                              );
                              const data = await result.json();
                              alert(data.message);
                              setFetching(true);
                            } catch (error) {
                              console.log(error);
                              alert(error.message);
                            }
                          }
                        }}
                      >
                        Update
                      </button>
                    </td>
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

export default OfficerComplains;
