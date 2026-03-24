import React from 'react';
import * as Data from './DashboardData';
import { icons } from './Icons';

const AttendanceDetailModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal large">
        <div className="modal-header">
          <div>
            <h3>{employee.name} - Attendance Details</h3>
            <p className="modal-subtitle">{employee.id} • {employee.department} • {employee.shift} Shift</p>
          </div>
          <button className="close-btn" onClick={onClose}>{icons.x}</button>
        </div>
        
        <div className="modal-body">
          <div className="attendance-detail-stats">
            <div className="detail-stat-card"><div className="detail-stat-value">{employee.totalLeaves}</div><div className="detail-stat-label">Total Leaves</div></div>
            <div className="detail-stat-card"><div className="detail-stat-value">{employee.lateArrivals}</div><div className="detail-stat-label">Late Arrivals</div></div>
            <div className="detail-stat-card"><div className="detail-stat-value">95%</div><div className="detail-stat-label">Attendance Rate</div></div>
          </div>

          <div className="attendance-chart-section">
            <h4>7-Month Trend</h4>
            <div className="line-chart">
              <svg viewBox="0 0 600 200" className="trend-chart">
                {[0, 1, 2, 3, 4].map(i => (<line key={i} x1="50" y1={40 + i * 30} x2="580" y2={40 + i * 30} stroke="#e2e8f0" strokeWidth="1"/>))}
                {Data.generateAttendanceTrend(employee).map((point, i, arr) => {
                  if (i === arr.length - 1) return null;
                  const x1 = 80 + i * 80; const y1 = 160 - point.leaves * 30;
                  const x2 = 80 + (i + 1) * 80; const y2 = 160 - arr[i + 1].leaves * 30;
                  return <g key={`l-${i}`}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="3"/><circle cx={x1} cy={y1} r="4" fill="#ef4444"/></g>;
                })}
              </svg>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default AttendanceDetailModal;