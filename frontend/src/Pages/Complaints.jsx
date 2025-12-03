import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import AdminSidebar from "../Components/AdminSidebar";
import AdminTopbar from "../Components/AdminTopbar";
import "../stylesheet/AdminDashboard.css";
import ZoneAdd from "../Components/ZoneAdd";
import OfficerAdd from "../Components/OfficerAdd";
import ComplainAdd from "../Components/UpdateComplain";

const Complaints = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [currentOfficerId, setCurrentOfficerId] = useState(null);
  const recordsPerPage = 5;

  const handleAssignClick = async (complaint) => {
    setSelectedComplaintId(complaint.complaint_id);
    setShowAssignForm(true);
    try {
      const result = await fetch(
        "http://localhost:5000/complaint/get-single-comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ complaint_id: complaint.complaint_id }),
        }
      );
      const data = await result.json();
      console.log(data.result.assigned_officer);

      setCurrentOfficerId(data.result.assigned_officer);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignSuccess = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("http://localhost:5000/complaint/get-complaints");
    const data = await res.json();
    setUsers(data);
  }

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
            <ComplainAdd
              showForm={showAssignForm}
              setShowForm={setShowAssignForm}
              complaintId={selectedComplaintId}
              onSuccess={handleAssignSuccess}
              currentOfficerId={currentOfficerId}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              Add Officer
            </button>
            <br />
            <br />
            <h2 className="mb-3">All Complaints</h2>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Complaint</th>
                  <th>User</th>
                  <th>Complaint Address</th>
                  <th>Zone name</th>
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
                    <td>{u.complaint_address}</td>
                    <td>{u.zone_name}</td>
                    <td>{u.status}</td>
                    <td>{u.complaint_date}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleAssignClick(u);
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

export default Complaints;
