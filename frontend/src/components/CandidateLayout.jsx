import React from "react";
import { useNavigate } from "react-router-dom";
import CandidateSidebar from "../pages/candidate/CandidateSidebar";
import "../pages/candidate/candidate.css";

function CandidateLayout({ children, activeTab, onTabChange }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      sessionStorage.removeItem("role");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/login");
    }
  };

  return (
    <div className="candidate-portal-layout">
      <CandidateSidebar 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        onLogout={handleLogout} 
      />
      
      <main className="candidate-main-content">
          {children}
      </main>
    </div>
  );
}

export default CandidateLayout;