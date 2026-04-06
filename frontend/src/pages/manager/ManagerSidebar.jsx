import React from 'react';
import '../employee/EmployeeSidebar.css'; 

const ManagerSidebar = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'team_attendance', label: 'Team Attendance', icon: <CalendarIcon /> },
    { id: 'leave_approvals', label: 'Leave Approvals', icon: <LeaveIcon /> },
    { id: 'team_members', label: 'Team Members', icon: <UserIcon /> }
  ];

  return (
    <aside className="emp-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <svg viewBox="0 0 40 40" fill="none">
             <rect width="40" height="40" rx="8" fill="#d946ef" />
             <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="white" />
          </svg>
        </div>
        <div className="sidebar-app-name">
          HRMS
          <span>Manager Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button 
                className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
        <div className="footer-version">v1.2.0 • Municipal HR</div>
      </div>
    </aside>
  );
};

/* --- Simple Inline SVGs for Icons --- */
const DashboardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const LeaveIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const LogoutIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

export default ManagerSidebar;
