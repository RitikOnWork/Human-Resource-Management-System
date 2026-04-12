import React, { useState, useEffect } from 'react';
import * as Data from './DashboardData';
import { icons } from './Icons';

const PayrollView = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hr/payroll', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setPayrollData(data.payroll && data.payroll.length ? data.payroll : Data.payrollRecords);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load payroll', err);
        setPayrollData(Data.payrollRecords);
        setLoading(false);
      });
  }, []);

  return (
    <div className="section-content payroll-management">
      <div className="admin-header">
        <div>
          <h2 className="admin-title">Payroll Management</h2>
          <p className="admin-subtitle">Financial cycle for January 2026</p>
        </div>
        <button className="primary-btn">
          {icons.dollar} Process Full Cycle
        </button>
      </div>

      <div className="payroll-stats-grid">
        {Data.payrollStats.map(stat => (
          <div key={stat.label} className="payroll-stat-card">
            <div className="stat-card-icon">{icons[stat.icon] || icons.dollar}</div>
            <div className="stat-card-info">
              <span className="stat-card-label">{stat.label}</span>
              <div className="stat-card-value">{stat.value}</div>
              {stat.trend !== 0 && (
                <span className={`stat-card-trend ${stat.trend > 0 ? 'up' : 'down'}`}>
                  {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}% vs last month
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="payroll-container-premium">
        <div className="payroll-table-wrapper">
          <table className="payroll-table-modern">
            <thead>
              <tr>
                <th>Personnel</th>
                <th>Department</th>
                <th>Base Monthly</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="payroll-user">
                      <div className="payroll-avatar">{Data.getInitials(row.name)}</div>
                      <div className="payroll-name-box">
                        <div className="payroll-user-name">{row.name}</div>
                        <div className="payroll-id">ID: #{row.id}092</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="payroll-dept-tag">{row.department}</span></td>
                  <td><div className="payroll-salary-value">{row.basicSalary}</div></td>
                  <td><div className="payroll-method">{row.method || 'Bank Transfer'}</div></td>
                  <td>
                    <span className={`status-pill ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollView;
