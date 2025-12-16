import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import { getToken, setToken as saveToken } from "./auth";
import "./styles/style.css";

const App = () => {
  const [token, setAuthToken] = useState(getToken());
  const [showRegister, setShowRegister] = useState(false);

  const handleAuth = (newToken) => {
    saveToken(newToken);
    setAuthToken(newToken);
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  if (!token) {
    return showRegister ? (
      <Register
        onRegister={handleAuth}
        onToggle={() => setShowRegister(false)}
      />
    ) : (
      <Login onLogin={handleAuth} onToggle={() => setShowRegister(true)} />
    );
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default App;
