import React from "react";
import { useState } from "react";

const UserLogin = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="reg-card">
      <h2 className="reg-title">Register</h2>

      <form className="reg-form" noValidate>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full name"
          />
        </label>

        <label>
          Address
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your address"
          />
        </label>

        <div className="row">
          <label className="col">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
            />
          </label>

          <label className="col">
            Contact
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="tel"
              placeholder="1234567890"
            />
          </label>
        </div>

        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Choose a username"
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="At least 6 characters"
          />
        </label>
      </form>
    </div>
  );
};

export default UserLogin;
