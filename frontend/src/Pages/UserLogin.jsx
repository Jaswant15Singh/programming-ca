import React, { useState } from "react";

export default function UserLogin() {
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
    }

    if (!contact.trim()) {
      e.contact = "Contact is required.";
    }

    if (!username.trim()) e.username = "Username is required.";
    if (!password) {
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
        name,
        address,
        email,
        contact,
        username,
        password,
      };

      const res = await fetch("", {
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
    }
  };

  return (
    <div className="reg-card">
      <h2 className="reg-title">Register</h2>

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

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="At least 6 characters"
            className={errors.password ? "input error-input" : "input"}
          />
          {errors.password && (
            <small className="error-text">{errors.password}</small>
          )}
        </label>

        <button type="submit" className="reg-btn" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
