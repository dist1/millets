import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Auth from "./pages/Auth";
import SharedMachineries from "./pages/SharedMachineries";
import CollaborativeFarming from "./pages/CollaborativeFarming";
import Help from "./pages/Help";
import Calendar from "./pages/Calendar";
import Tracker from "./pages/Tracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/shared" element={<SharedMachineries />} />
        <Route path="/collab" element={<CollaborativeFarming />} />
        <Route path="/help" element={<Help />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  );
}

export default App;