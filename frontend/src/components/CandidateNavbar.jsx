import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton"; // Assuming you have this, or remove it for now
import "./CandidateNavbar.css";

function CandidateNavbar() {
  return (
    <nav className="candidate-navbar">
      <div className="nav-brand">
        <div className="brand-badge">NY</div>
        <h2>Nagar Yukt Careers</h2>
      </div>

      <div className="nav-links">
        <NavLink 
          to="/candidate/dashboard" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/candidate/jobs" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Browse Jobs
        </NavLink>
        <NavLink 
          to="/candidate/applications" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          My Applications
        </NavLink>
      </div>

      <div className="nav-actions">
        {/* If you don't have LogoutButton yet, just put a placeholder button here */}
        <LogoutButton /> 
      </div>
    </nav>
  );
}

export default CandidateNavbar;