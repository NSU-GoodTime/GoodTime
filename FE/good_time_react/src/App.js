import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import Main from "./main/main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
