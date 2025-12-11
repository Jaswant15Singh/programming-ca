import React, { useEffect, useState } from "react";
import "../stylesheet/UserLogin.css";
import HomeHeader from "../Components/HomeHeader";
export default function ZoneAdd({
  showForm,
  setShowForm,
  isAdding,
  setIsAdding,
  editingId,
  editingName,
  setEditingId,
  fetching,
  setFetching,
}) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isAdding && editingName) {
      setName(editingName);
    }
  }, [editingName, isAdding]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Zone name is required.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setMessage(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);

      const payload = {
        zone_name: name,
      };
      let zone_id = editingId;
      console.log(payload);

      const res = await fetch(
        isAdding
          ? "https://programming-ca.onrender.com/admin/create-zone"
          : `https://programming-ca.onrender.com/admin/update-zone/${zone_id}`,
        {
          method: isAdding ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.message || "Creation failed.",
        });
      } else {
        setMessage({
          type: "success",
          text: data.message || "Created successfully.",
        });
        setName("");
        setFetching(!fetching);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error. Try again later." });
    } finally {
      setSubmitting(false);
      setEditingId(null);
      setIsAdding(true);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div className={`${showForm ? "overlay" : ""}`}>
      <div
        className="reg-card"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          display: showForm ? "block" : "none",
        }}
      >
        <h2 className="reg-title">Create Zone</h2>
        <p
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          &#10060;
        </p>

        {message && (
          <div
            className={`reg-msg ${
              message.type === "error" ? "error" : "success"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="reg-form" noValidate>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full name"
              className={errors.name ? "input error-input" : "input"}
            />
            {errors.name && <small className="error-text">{errors.name}</small>}
          </label>

          <button type="submit" className="reg-btn" disabled={submitting}>
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
