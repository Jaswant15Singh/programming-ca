import React, { useEffect, useState } from "react";
import "../stylesheet/UserComplaints.css";
import UserSidebar from "../Components/UserSidebar";
import UserTopbar from "../Components/UserTopbar";
import AddComplain from "../Components/AddComplain";
import { jwtDecode } from "jwt-decode";

("../Components/AdminDashboard");
const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("user-token");
  const user_id = jwtDecode(token).user_id;
  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = async () => {
    const res = await fetch(
      `http://localhost:5000/complaint/get-complaints-by-user/${user_id}`
    );
    const data = await res.json();
    console.log(data);

    setComplaints(data);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState(null);
  const [adding, setAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredComplaints = complaints.filter((complaint) => {
    const query = searchQuery.toLowerCase();
    return complaint.complaint?.toLowerCase().includes(query);
  });
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
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
          <div className="complaints-container">
            <div className="complaints-wrapper">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAdding((prev) => !prev);
                }}
              >
                Add Complain
              </button>
              <br />
              <br />
              <AddComplain
                adding={adding}
                user_id={user_id}
                setAdding={setAdding}
              />
              <h1 className="complaints-title">My Complaints</h1>

              <div className="complaints-list">
                {currentComplaints.map((complaint) => (
                  <div key={complaint.complaint_id} className="complaint-card">
                    <div className="complaint-header">
                      <div className="complaint-info">
                        <h2 className="complaint-name">
                          Name:{complaint.complaint}
                        </h2>
                        <p>
                          <b>Address</b>:{complaint.complaint_address}
                        </p>
                        <span
                          className={`status-badge status-${complaint.status}`}
                        >
                          {complaint.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="complaint-images-section">
                      <div className="images-count">
                        📷 {complaint.complaint_images.length}{" "}
                        {complaint.complaint_images.length === 1
                          ? "image"
                          : "images"}
                      </div>
                      <div className="images-grid">
                        {complaint.complaint_images.map((img, idx) => (
                          <img
                            key={idx}
                            src={`http://localhost:5000/${img.replace(
                              "public",
                              ""
                            )}`}
                            alt={`Complaint ${complaint.id} - Image ${idx + 1}`}
                            className="complaint-thumbnail"
                            onClick={() =>
                              setSelectedImages(complaint.complaint_images)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, complaints.length)} of {complaints.length}{" "}
                  complaints
                </div>

                <div className="pagination-controls">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-arrow"
                  >
                    ←
                  </button>

                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToPage(idx + 1)}
                        className={`pagination-number ${
                          currentPage === idx + 1 ? "active" : ""
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-arrow"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Image Modal */}
            {selectedImages && (
              <div
                className="modal-overlay"
                onClick={() => setSelectedImages(null)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-images-grid">
                    {selectedImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Full view ${idx + 1}`}
                        className="modal-image"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedImages(null)}
                    className="modal-close-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComplaints;
