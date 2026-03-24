import React from 'react';
import * as Data from './DashboardData';
import { icons } from './Icons';

const EmployeesView = ({ filteredEmployees, handleViewEmployee, setShowAddEmployee }) => {
  return (
    <div className="section-content">
      <div className="section-header">
        <h2>Employee Management</h2>
        <button className="primary-btn" onClick={() => setShowAddEmployee(true)}>
          {icons.plus} Add Employee
        </button>
      </div>
      <div className="employee-list">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="employee-card" onClick={() => handleViewEmployee(emp)}>
            <div className="employee-avatar">{Data.getInitials(emp.name)}</div>
            <div className="employee-info">
              <div className="employee-name">{emp.name}</div>
              <div className="employee-meta">{emp.department} • {emp.id}</div>
            </div>
            <span className={`status-badge ${emp.status ? emp.status.toLowerCase() : 'active'}`}>
              {emp.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesView;