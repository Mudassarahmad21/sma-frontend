"use client";

import { useState } from "react";
import { loginUser } from "../api";
import { setToken } from "../auth";

const Login = ({ onLogin, onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      setToken(res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={onToggle}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
