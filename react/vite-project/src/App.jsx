// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContainer from "./containers/AppContainer.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
