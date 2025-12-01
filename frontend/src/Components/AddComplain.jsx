import React, { useState } from "react";
import "../stylesheet/AddComplain.css";

const AddComplain = ({ adding, user_id }) => {
  const [complaintName, setComplaintName] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Add new files to existing images
      setImages((prevImages) => [...prevImages, ...files]);

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    // Remove from images array
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // Revoke the preview URL and remove from previews
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaintName.trim()) {
      alert("Please enter a complaint name");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("complaint", complaintName); // Changed from "complaint_name" to "complaint"

    images.forEach((image) => {
      formData.append("complaint_images", image);
    });
    formData.append("user_id", user_id);
    formData.entries().forEach((e) => {
      console.log(e);
    });

    try {
      const response = await fetch(
        "http://localhost:5000/complaint/add-complaint",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Complaint submitted successfully!");
        setComplaintName("");
        setImages([]);
        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        setImagePreviews([]);
      } else {
        alert("Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Error submitting complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  return adding ? (
    <div className={`${adding ? "overlay" : ""}`}>
      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="form-title">Submit a Complaint</h1>

          <form onSubmit={handleSubmit} className="complaint-form">
            <div className="form-group">
              <label htmlFor="complaintName" className="form-label">
                Complaint Name
              </label>
              <input
                type="text"
                id="complaintName"
                value={complaintName}
                onChange={(e) => setComplaintName(e.target.value)}
                className="form-input"
                placeholder="Enter complaint name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="complaint_images" className="form-label">
                Upload Images
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="complaint_images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="complaint_images" className="file-label">
                  {/* Changed from htmlFor="images" to htmlFor="complaint_images" */}
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">Click to upload images</span>
                  <span className="upload-subtext">or drag and drop</span>
                </label>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="previews-section">
                <h3 className="previews-title">
                  Selected Images ({imagePreviews.length})
                </h3>
                <div className="previews-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-btn"
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddComplain;
