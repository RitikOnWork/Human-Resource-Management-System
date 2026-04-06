import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton"; 
import "./AdminNavbar.css";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="nav-brand">
        <div className="brand-badge admin-badge">Admin</div>
        <h2>HRMS</h2>
      </div>

      <div className="nav-links">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/create-job"
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Post Job
        </NavLink>
        <NavLink
          to="/hr/create-employee"
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Onboard Employee
        </NavLink>
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