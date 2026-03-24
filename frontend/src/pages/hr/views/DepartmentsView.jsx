import React from 'react';
import * as Data from './DashboardData';

const DepartmentsView = ({ departments = [] }) => {
  const depts = departments && departments.length ? departments : Data.departments;
  const pieSegments = Data.calculatePieSegments(depts);

  return (
    <div className="section-content">
      <div className="section-header"><h2>Department Overview</h2></div>
      <div className="departments-container">
        <div className="pie-chart-section">
          <h3>Employee Distribution</h3>
          <svg viewBox="0 0 200 200" className="pie-chart">
            {pieSegments.map((segment) => {
              const startX = 100 + 90 * Math.cos((segment.startAngle * Math.PI) / 180);
              const startY = 100 + 90 * Math.sin((segment.startAngle * Math.PI) / 180);
              const endX = 100 + 90 * Math.cos((segment.endAngle * Math.PI) / 180);
              const endY = 100 + 90 * Math.sin((segment.endAngle * Math.PI) / 180);
              const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
              return (
                <path key={segment.name} d={`M 100 100 L ${startX} ${startY} A 90 90 0 ${largeArc} 1 ${endX} ${endY} Z`} fill={segment.color} />
              );
            })}
            <circle cx="100" cy="100" r="50" fill="white" />
          </svg>
        </div>
        <div className="departments-list">
          {depts.map(dept => (
            <div key={dept.name} className="dept-item">
              <div className="dept-info"><div className="dept-color" style={{ backgroundColor: dept.color }}></div><div>{dept.name}</div></div>
              <div>{dept.employees}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsView;