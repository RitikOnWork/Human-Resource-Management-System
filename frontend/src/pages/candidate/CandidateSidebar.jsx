import React from 'react';
import { icons } from '../hr/views/Icons';
import './candidate.css';

const CandidateSidebar = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Candidate Home', icon: icons.dashboard },
    { id: 'jobs', label: 'Explore Jobs', icon: icons.performance },
    { id: 'applications', label: 'My Applications', icon: icons.history },
    { id: 'profile', label: 'Candidate Profile', icon: icons.employee },
    { id: 'settings', label: 'Account Settings', icon: icons.settings },
  ];

  return (
    <aside className="candidate-sidebar">
      {/* Header */}
      <div className="candidate-sidebar-header">
        <div className="candidate-logo-icon">
          <svg viewBox="0 0 40 40" fill="none">
             <rect width="40" height="40" rx="12" fill="rgba(34, 211, 238, 0.15)" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1"/>
             <path d="M20 12 L28 20 L20 28 L12 20 Z" fill="#22d3ee" />
          </svg>
        </div>
        <div className="candidate-app-name">
          Candidate
          <span>Talent Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="candidate-sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button 
                className={`candidate-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="candidate-nav-icon">{item.icon}</span>
                <span className="candidate-nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="candidate-sidebar-footer">
        <button className="candidate-logout-btn" onClick={onLogout}>
          {icons.check}
          <span>Log Out</span>
        </button>
        <div className="candidate-footer-version">v1.2.0 • HRSync</div>
      </div>
    </aside>
  );
};

export default CandidateSidebar;
