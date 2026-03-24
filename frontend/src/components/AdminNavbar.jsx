import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton"; 
import "./AdminNavbar.css";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="nav-brand">
        <div className="brand-badge admin-badge">Admin</div>
        <h2>Nagar Yukt HRMS</h2>
      </div>

      <div className="nav-links">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Dashboard
        </NavLink>
        {/* You can add more admin links here as your app grows */}
        <NavLink 
          to="/hr/create-employee" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Onboard Employee
        </NavLink>
        {/* ADD THIS NEW LINK */}
        <NavLink 
          to="/admin/employees" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Employee Directory
        </NavLink>
      </div>

      <div className="nav-actions">
        <LogoutButton /> 
      </div>
    </nav>
  );
}

export default AdminNavbar;