import { useEffect, useState } from "react";
import "../stylesheet/UserLogin.css";

export default function ComplainAdd({
  showForm,
  setShowForm,
  complaintId,
  onSuccess,
  currentOfficerId,
}) {
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [officerList, setOfficerList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (showForm) {
      fetchOfficers();
      if (currentOfficerId) {
        setSelectedOfficer(currentOfficerId);
      } else {
        setSelectedOfficer("");
      }
    } else {
      setSelectedOfficer("");
    }
  }, [showForm, currentOfficerId]);
  const fetchOfficers = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/get-all-officers");
      const data = await res.json();
      setOfficerList(data);
    } catch (error) {
      console.error("Failed to fetch officers:", error);
      setMessage({ type: "error", text: "Failed to load officers." });
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setMessage(null);

    if (!selectedOfficer) {
      setMessage({ type: "error", text: "Please select an officer." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/complaint/assign-officer-complaint/${complaintId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ officer_id: selectedOfficer }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.message || "Failed to assign officer.",
        });
      } else {
        setMessage({
          type: "success",
          text: data.message || "Officer assigned successfully.",
        });
        setTimeout(() => {
          closeForm();
          if (onSuccess) onSuccess();
        }, 1500);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage({ type: "error", text: "Server error. Try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedOfficer("");
    setMessage(null);
  };

  if (!showForm) return null;

  return (
    <>
      <div className="overlay" onClick={closeForm} />

      <div
        className="reg-card"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        <h2 className="reg-title">Assign Officer to Complaint</h2>

        <button
          className="close-btn"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "20px",
          }}
          onClick={closeForm}
          aria-label="Close form"
        >
          ✕
        </button>

        {message && (
          <div className={`reg-msg ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="reg-form" noValidate>
          <label htmlFor="officers">
            Select Officer
            <select
              id="officers"
              name="officers"
              value={selectedOfficer}
              onChange={(e) => setSelectedOfficer(e.target.value)}
              required
            >
              <option value="">-- Choose an officer --</option>
              {officerList.map((officer) => (
                <option key={officer.officer_id} value={officer.officer_id}>
                  {officer.officer_name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="reg-btn" disabled={submitting}>
            {submitting ? "Assigning..." : "Assign Officer"}
          </button>
        </form>
      </div>
    </>
  );
}
