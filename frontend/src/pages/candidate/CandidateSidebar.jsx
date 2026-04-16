import React from 'react';
import { icons } from '../hr/views/Icons';
import './candidate.css';

const CandidateSidebar = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Candidate Overview', icon: icons.dashboard },
    { id: 'jobs', label: 'Global Openings', icon: icons.performance },
    { id: 'applications', label: 'My Applications', icon: icons.history },
    { id: 'profile', label: 'Digital Portfolio', icon: icons.employee },
    { id: 'settings', label: 'Account Config', icon: icons.settings },
  ];

  return (
    <aside className="candidate-sidebar">
      {/* Header */}
      <div className="candidate-sidebar-header">
        <div className="candidate-logo-icon">
          <svg viewBox="0 0 40 40" fill="none" style={{ width: '42px', height: '42px' }}>
             <rect width="40" height="40" rx="14" fill="var(--bg-secondary)" />
             <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20Z" fill="var(--accent-purple)" fillOpacity="0.2" />
             <circle cx="20" cy="20" r="6" fill="var(--accent-purple)" />
          </svg>
        </div>
        <div className="candidate-app-name">
          Talent
          <span>Sync Hub</span>
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
                <span style={{ fontSize: '1.2rem', display: 'flex' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="candidate-sidebar-footer">
        <button className="candidate-logout-btn" onClick={onLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>End Session</span>
        </button>
        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, opacity: 0.6, marginTop: '1rem' }}>v2.4.0 High-Fidelity</div>
      </div>
    </aside>
  );
};

export default CandidateSidebar;
