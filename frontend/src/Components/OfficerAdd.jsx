import React, { useState } from "react";
import "../stylesheet/UserLogin.css";
import HomeHeader from "../Components/HomeHeader";
export default function OfficerAdd({ showForm, setShowForm }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!address.trim()) e.address = "Address is required.";

    if (!email.trim()) {
      e.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      e.email = "Invalid email address.";
    }

    if (!contact.trim()) {
      e.contact = "Contact is required.";
    } else if (!/^[0-9]{7,15}$/.test(contact)) {
      e.contact = "Invalid contact (use only digits, min 7).";
    }

    if (!username.trim()) e.username = "Username is required.";

    if (!password) {
      e.password = "Password is required.";
    } else if (password.length < 1) {
      e.password = "Password is required.";
    }

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
        officer_name: name,
        officer_address: address,
        officer_email: email,
        officer_contact: contact,
        login_username: username,
        password,
      };
      console.log(payload);

      const res = await fetch("http://localhost:5000/admin/create-officer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.message || "Registration failed.",
        });
      } else {
        setMessage({
          type: "success",
          text: data.message || "Registered successfully.",
        });
        setName("");
        setAddress("");
        setEmail("");
        setContact("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error. Try again later." });
    } finally {
      setSubmitting(false);
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

          <label>
            Address
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address"
              className={
                errors.address ? "input textarea error-input" : "input textarea"
              }
            />
            {errors.address && (
              <small className="error-text">{errors.address}</small>
            )}
          </label>

          <div className="row">
            <label className="col">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className={errors.email ? "input error-input" : "input"}
              />
              {errors.email && (
                <small className="error-text">{errors.email}</small>
              )}
            </label>

            <label className="col">
              Contact
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="tel"
                placeholder="1234567890"
                className={errors.contact ? "input error-input" : "input"}
              />
              {errors.contact && (
                <small className="error-text">{errors.contact}</small>
              )}
            </label>
          </div>
          <div className="row">
            <div className="col">
              <label>
                Username
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Choose a username"
                  className={errors.username ? "input error-input" : "input"}
                />
                {errors.username && (
                  <small className="error-text">{errors.username}</small>
                )}
              </label>
            </div>
            <div className="col">
              <label>
                Password
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                  className={errors.password ? "input error-input" : "input"}
                />
                {errors.password && (
                  <small className="error-text">{errors.password}</small>
                )}
              </label>
            </div>
          </div>

          <button type="submit" className="reg-btn" disabled={submitting}>
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
