import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./auth";
import "./styles/style.css";

const App = () => {
  const [token, setToken] = useState(getToken());

  if (!token) {
    const [showRegister, setShowRegister] = useState(false);
    return showRegister ? (
      <Register onRegister={setToken} />
    ) : (
      <Login onLogin={setToken} />
    );
  }

  return <Dashboard onLogout={() => setToken(null)} />;
};

export default App;
