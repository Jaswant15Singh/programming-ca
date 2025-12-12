import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../stylesheet/UserProfile.css";
import UserSidebar from "../Components/UserSidebar";
import UserTopbar from "../Components/UserTopbar";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    user_name: "",
    user_email: "",
    user_contact: "",
    user_address: "",
  });
  const [originalData, setOriginalData] = useState({});
  const token = localStorage.getItem("user-token");
  const user_id = jwtDecode(token).user_id;

  // Fetch user profile data
  useEffect(() => {
    fetchUserProfile();
  }, [user_id]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://programming-ca.onrender.com/users/profile/${user_id}`
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setProfileData(data.data);
        setOriginalData(data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://programming-ca.onrender.com/users/update-user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            ...profileData,
          }),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
        setOriginalData(profileData);
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-content">
        <UserTopbar />

        <div className="dashboard">
          <div className="profile-page">
            <div className="profile-background">
              <div className="gradient-orb orb-1"></div>
              <div className="gradient-orb orb-2"></div>
              <div className="gradient-orb orb-3"></div>
            </div>

            <div className="profile-container">
              {/* Profile Header Card */}
              <div className="profile-header-card">
                <div className="cover-section">
                  <div className="cover-gradient"></div>
                </div>

                <div className="profile-avatar-section">
                  <div className="avatar-wrapper">
                    <div className="avatar-ring"></div>
                    <div className="avatar-content">
                      {profileData.user_name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="profile-name-section">
                    <h1 className="profile-name">{profileData.user_name}</h1>
                    <p className="profile-subtitle">Member Profile</p>
                  </div>
                </div>
              </div>

              {/* Profile Details Card */}
              <div className="profile-details-card">
                <div className="card-header">
                  <h2 className="card-title">Personal Information</h2>
                  {!isEditing && (
                    <button onClick={handleEdit} className="btn-edit-icon">
                      <span className="edit-icon">✎</span>
                      Edit
                    </button>
                  )}
                </div>

                <div className="details-grid">
                  {/* Name Field */}
                  <div className="detail-item">
                    <div className="detail-icon-wrapper">
                      <span className="detail-icon">👤</span>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="user_name"
                          value={profileData.user_name}
                          onChange={handleChange}
                          className="detail-input"
                          placeholder="Enter your name"
                        />
                      ) : (
                        <p className="detail-value">{profileData.user_name}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="detail-item">
                    <div className="detail-icon-wrapper">
                      <span className="detail-icon">📧</span>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="user_email"
                          value={profileData.user_email}
                          onChange={handleChange}
                          className="detail-input"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="detail-value">{profileData.user_email}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Field */}
                  <div className="detail-item">
                    <div className="detail-icon-wrapper">
                      <span className="detail-icon">📱</span>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="user_contact"
                          value={profileData.user_contact}
                          onChange={handleChange}
                          className="detail-input"
                          placeholder="Enter your contact"
                        />
                      ) : (
                        <p className="detail-value">
                          {profileData.user_contact}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="detail-item detail-item-full">
                    <div className="detail-icon-wrapper">
                      <span className="detail-icon">📍</span>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Address</label>
                      {isEditing ? (
                        <textarea
                          name="user_address"
                          value={profileData.user_address}
                          onChange={handleChange}
                          className="detail-textarea"
                          placeholder="Enter your address"
                          rows="3"
                        />
                      ) : (
                        <p className="detail-value">
                          {profileData.user_address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="action-buttons">
                    <button
                      onClick={handleCancel}
                      className="btn-action btn-cancel"
                    >
                      <span>✕</span>
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-action btn-save"
                    >
                      <span>✓</span>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
