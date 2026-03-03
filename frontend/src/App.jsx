import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login.jsx";
import HealthHub from "./components/HealthHub";
import Profile from "./components/Profile.jsx";
import Wellness from "./components/Wellness";
import ProgramTracker from "./components/ProgramTracker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feedback from "./components/Feedback";
import WellnessSidebar from "./components/WellnessSidebar.jsx";
import WellnessContent from "./components/WellnessContent.jsx";
import Telemedicine from "./components/Telemedicine.jsx";


// --- 1. IMPORT THE NEW COMPONENT ---
import CommunityReport from "./components/CommunityReport.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/program-tracker" element={<ProgramTracker />} />
        <Route path="/health-hub" element={<HealthHub />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/wellnesssidebar" element={<WellnessSidebar />} />
        <Route path="/wellness/:topic/:purpose" element={<WellnessContent />} />
        <Route path="/telemedicine" element={<Telemedicine />} />

        {/* --- 2. ADD THE NEW ROUTE FOR THE REPORTING PAGE --- */}
        <Route path="/report-issue" element={<CommunityReport />} />


      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}