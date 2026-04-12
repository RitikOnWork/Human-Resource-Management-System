import React from 'react';
import * as Data from './DashboardData';
import { icons } from './Icons';

const EmployeesView = ({ filteredEmployees, handleViewEmployee, setShowAddEmployee }) => {
  return (
    <div className="section-content employee-management">
      <div className="admin-header">
        <h2 className="admin-title">Employee Management</h2>
        <button className="primary-btn" onClick={() => setShowAddEmployee(true)}>
          {icons.plus} Register New Personnel
        </button>
      </div>

      <div className="employee-grid">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="employee-card premium-card" onClick={() => handleViewEmployee(emp)}>
            <div className="card-accent"></div>
            <div className="employee-card-body">
                <div className="employee-avatar-main">{Data.getInitials(emp.name)}</div>
                <div className="employee-main-content">
                  <h3 className="employee-name-heading">{emp.name}</h3>
                  <div className="employee-subtitle">{emp.department} • <span className="emp-id-tag">{emp.id}</span></div>
                </div>
                <div className="status-indicator">
                    <span className={`status-pill ${emp.status ? emp.status.toLowerCase() : 'active'}`}>
                        {emp.status}
                    </span>
                </div>
            </div>
            <div className="card-footer-actions">
                <button className="view-profile-btn">View Full Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesView;