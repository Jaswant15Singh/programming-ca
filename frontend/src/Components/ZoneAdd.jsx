import React, { useState } from "react";

const ZoneAdd = ({ showForm, setShowForm }) => {
  const [zoneName, setZoneName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Zone Added:", zoneName);

    setZoneName("");
    setShowForm(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Zone
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "300px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h3>Add Zone</h3>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="zoneName"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Zone Name:
            </label>
            <input
              type="text"
              id="zoneName"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #aaa",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{
              padding: "8px 16px",
              marginLeft: "10px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ZoneAdd;
