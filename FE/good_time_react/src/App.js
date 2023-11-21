import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import Calendar from "./main/calendar";
import VoteTable from "./vote/vote";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/v1/utime/:userId' element={<VoteTable />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
