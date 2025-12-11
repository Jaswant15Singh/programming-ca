import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import AdminSidebar from "../Components/AdminSidebar";
import AdminTopbar from "../Components/AdminTopbar";
import "../stylesheet/AdminDashboard.css";
import ZoneAdd from "../Components/ZoneAdd";

const Zones = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const recordsPerPage = 5;
  const [isAdding, setIsAdding] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = users.filter((zone) => {
    const query = searchQuery.toLowerCase();
    return zone.zone_name?.toLowerCase().includes(query);
  });

  useEffect(() => {
    fetchUsers();
  }, [fetching]);

  async function fetchUsers() {
    const res = await fetch(
      "https://programming-ca.onrender.com/admin/get-zones"
    );
    const data = await res.json();
    setUsers(data);
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
        <AdminSidebar />
        <div className="main-content">
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
          <div className="dashboard">
            <ZoneAdd
              showForm={showForm}
              setShowForm={setShowForm}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              editingId={editingId}
              editingName={editingName}
              setEditingId={setEditingId}
              fetching={fetching}
              setFetching={setFetching}
            />

            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              Add Zone
            </button>
            <br />
            <br />

            <h2 className="mb-3">All Users</h2>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Created date</th>
                  <th>Update date</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((u, i) => {
                  const date = new Date(u.updated_date);
                  const created_date = new Date(u.created_date);
                  return (
                    <tr key={i}>
                      <td>{firstIndex + i + 1}</td>
                      <td>{u.zone_name}</td>
                      <td>{created_date.toLocaleString()}</td>
                      <td>{u.updated_date ? date.toLocaleString() : "NA"}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setIsAdding(false);
                            setEditingId(u.zone_id);
                            setEditingName(u.zone_name);
                            setShowForm(true);
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

export default Zones;
