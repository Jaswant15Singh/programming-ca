import React, { useEffect, useState } from "react";
import "../stylesheet/AddComplain.css";

const AddComplain = ({ adding, user_id, setAdding }) => {
  const [complaintName, setComplaintName] = useState("");
  const [images, setImages] = useState([]);
  const [zone, setZone] = useState(null);
  const [zone_name, setZoneName] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    getZone();
  }, []);

  const getZone = async () => {
    try {
      const result = await fetch("http://localhost:5000/admin/get-zones");
      const data = await result.json();
      setZone(data);
    } catch (error) {
      console.log(error);
    }
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
    formData.append("complaint", complaintName);

    images.forEach((image) => {
      formData.append("complaint_images", image);
    });
    formData.append("user_id", user_id);
    formData.append("zone_name", zone_name);
    formData.append("address", address);

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
            <p
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setAdding(false);
              }}
            >
              X
            </p>
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
              <label htmlFor="zone" className="form-label">
                Zone
              </label>
              <select
                name="zone_name"
                id="zone_name"
                className="file-control"
                onChange={(e) => {
                  setZoneName(e.target.value);
                }}
                value={zone_name}
              >
                <option value="" disabled={true}>
                  Select zone
                </option>
                {zone.map((e) => (
                  <option value={e.zone_id} key={e.zone_id}>
                    {e.zone_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                placeholder="Enter address "
                required
              ></textarea>
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
