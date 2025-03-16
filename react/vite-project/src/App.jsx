import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "./containers/AppContainer.jsx";
import LoginContainer from "./containers/LoginContainer.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginContainer setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={isAuthenticated ? <AppContainer /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;