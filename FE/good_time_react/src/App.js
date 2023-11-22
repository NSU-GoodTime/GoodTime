import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import Main from "./main/main";
import Calendar from "./main/calendar";
import VoteTable from "./vote/vote";
import OverallVotesTable from "./login/overallVotesTable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/utime/:userId' element={<VoteTable />} />
          <Route path='/loginPage/:roomId' element={<LoginPage />} />
          <Route path='/overallVotesTable' element={<OverallVotesTable />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
