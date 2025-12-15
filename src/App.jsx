"use client";

import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./auth";
import "./styles/style.css";

const App = () => {
  const [token, setToken] = useState(getToken());
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return showRegister ? (
      <Register onRegister={setToken} onToggle={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={setToken} onToggle={() => setShowRegister(true)} />
    );
  }

  return <Dashboard onLogout={() => setToken(null)} />;
};

export default App;
