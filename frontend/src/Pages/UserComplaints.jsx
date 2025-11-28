import React, { useState } from "react";
import "../stylesheet/UserComplaints.css";
import UserSidebar from "../Components/UserSidebar";
import UserTopbar from "../Components/UserTopbar";
("../Components/AdminDashboard");
const UserComplaints = () => {
  // Sample data - replace with your actual data
  const allComplaints = [
    {
      id: 1,
      name: "Broken Street Light",
      status: "pending",
      images: [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      ],
    },
    {
      id: 2,
      name: "Pothole on Main Street",
      status: "in-progress",
      images: [
        "https://images.unsplash.com/photo-1449247666642-264389f5f5b1?w=400",
      ],
    },
    {
      id: 3,
      name: "Noise Complaint - Construction",
      status: "resolved",
      images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
      ],
    },
    {
      id: 4,
      name: "Water Leakage in Building",
      status: "pending",
      images: [
        "https://images.unsplash.com/photo-1563207153-f403bf289096?w=400",
      ],
    },
    {
      id: 5,
      name: "Garbage Collection Missed",
      status: "in-progress",
      images: [
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
        "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400",
      ],
    },
    {
      id: 6,
      name: "Broken Sidewalk",
      status: "resolved",
      images: [
        "https://images.unsplash.com/photo-1583939411023-42c2b6ac3cd9?w=400",
      ],
    },
    {
      id: 7,
      name: "Park Maintenance Required",
      status: "pending",
      images: [
        "https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=400",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
      ],
    },
    {
      id: 8,
      name: "Traffic Signal Malfunction",
      status: "in-progress",
      images: [
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400",
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState(null);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = allComplaints.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
        <UserTopbar />

        <div className="dashboard">
          <div className="complaints-container">
            <div className="complaints-wrapper">
              <h1 className="complaints-title">My Complaints</h1>

              <div className="complaints-list">
                {currentComplaints.map((complaint) => (
                  <div key={complaint.id} className="complaint-card">
                    <div className="complaint-header">
                      <div className="complaint-info">
                        <h2 className="complaint-name">{complaint.name}</h2>
                        <span
                          className={`status-badge status-${complaint.status}`}
                        >
                          {complaint.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="complaint-images-section">
                      <div className="images-count">
                        📷 {complaint.images.length}{" "}
                        {complaint.images.length === 1 ? "image" : "images"}
                      </div>
                      <div className="images-grid">
                        {complaint.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Complaint ${complaint.id} - Image ${idx + 1}`}
                            className="complaint-thumbnail"
                            onClick={() => setSelectedImages(complaint.images)}
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
                  {Math.min(endIndex, allComplaints.length)} of{" "}
                  {allComplaints.length} complaints
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
