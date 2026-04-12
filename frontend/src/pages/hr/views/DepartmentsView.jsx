import React from 'react';
import * as Data from './DashboardData';

const DepartmentsView = ({ departments = [] }) => {
  const depts = departments && departments.length ? departments : Data.departments;
  const pieSegments = Data.calculatePieSegments(depts);
  const totalEmployees = depts.reduce((sum, d) => sum + d.employees, 0);

  return (
    <div className="section-content">
      <div className="section-header">
        <h2 className="admin-title">Department Distribution</h2>
      </div>
      
      <div className="departments-container">
        <div className="pie-chart-section">
          <div className="chart-wrapper">
             <svg viewBox="0 0 200 200" className="pie-chart">
               {pieSegments.map((segment) => {
                 const startX = 100 + 90 * Math.cos((segment.startAngle * Math.PI) / 180);
                 const startY = 100 + 90 * Math.sin((segment.startAngle * Math.PI) / 180);
                 const endX = 100 + 90 * Math.cos((segment.endAngle * Math.PI) / 180);
                 const endY = 100 + 90 * Math.sin((segment.endAngle * Math.PI) / 180);
                 const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
                 return (
                   <path 
                     key={segment.name} 
                     d={`M 100 100 L ${startX} ${startY} A 90 90 0 ${largeArc} 1 ${endX} ${endY} Z`} 
                     fill={segment.color} 
                   />
                 );
               })}
               <circle cx="100" cy="100" r="65" className="donut-hole" />
             </svg>
             
             <div className="chart-center-text">
               <span className="total-count">{totalEmployees}</span>
               <span className="total-label">Staff Total</span>
             </div>
          </div>
          <h3 className="chart-caption">Strategic Allocation</h3>
        </div>

        <div className="departments-list">
          <div className="list-header">
            <span>Department</span>
            <span>Headcount</span>
          </div>
          <div className="list-scroll">
            {depts.map(dept => (
              <div key={dept.name} className="dept-item">
                <div className="dept-info">
                  <div className="dept-color" style={{ backgroundColor: dept.color, boxShadow: `0 0 10px ${dept.color}66` }}></div>
                  <div className="dept-name-label">{dept.name}</div>
                </div>
                <div className="dept-count-pill">{dept.employees}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsView;