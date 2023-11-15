import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import Calendar from "./main/calendar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Calendar' element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
