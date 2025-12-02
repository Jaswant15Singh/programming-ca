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

  useEffect(() => {
    fetchUsers();
  }, [fetching]);

  async function fetchUsers() {
    const res = await fetch("http://localhost:5000/admin/get-zones");
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
                {currentUsers.map((u, i) => (
                  <tr key={i}>
                    <td>{firstIndex + i + 1}</td>
                    <td>{u.zone_name}</td>
                    <td>{u.created_date.slice(0, 10)}</td>
                    <td>{u.updated_date ? u.updated_date : "NA"}</td>
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

export default Zones;
