import React from 'react';
import * as Data from './DashboardData';
import { icons } from './Icons';

const PerformanceView = () => {
  return (
    <div className="section-content performance-management">
      <div className="admin-header">
        <div>
          <h2 className="admin-title">Performance Analytics</h2>
          <p className="admin-subtitle">Workforce evaluation & KPI tracking</p>
        </div>
        <button className="primary-btn">
          {icons.star} Initiate Review Cycle
        </button>
      </div>

      <div className="performance-stats-grid">
        {Data.performanceStats.map(stat => (
          <div key={stat.label} className="perf-stat-card">
            <div className="perf-stat-icon">{icons[stat.icon] || icons.trending}</div>
            <div className="perf-stat-info">
              <span className="perf-stat-label">{stat.label}</span>
              <div className="perf-stat-value">{stat.value}</div>
              <span className="perf-stat-trend up">↑ {stat.trend}% vs last Q</span>
            </div>
          </div>
        ))}
      </div>

      <div className="performance-leaderboard-card">
        <div className="leaderboard-header">
          <h3>Top Performers — Organization Wide</h3>
          <span className="period-tag">Jan - Mar 2026</span>
        </div>
        
        <div className="performers-list-modern">
          {Data.topPerformers.map((performer, index) => (
            <div key={performer.id} className="performer-item-premium">
              <div className="performer-rank-box">
                <span className={`rank-number color-${index + 1}`}>#{index + 1}</span>
              </div>
              
              <div className="performer-identity">
                <div className="performer-avatar-hex">{Data.getInitials(performer.name)}</div>
                <div className="performer-name-group">
                  <div className="performer-display-name">{performer.name}</div>
                  <div className="performer-dept-sub">{performer.department}</div>
                </div>
              </div>

              <div className="performer-metrics">
                <div className="metric-score">
                  <span className="score-label">Efficiency</span>
                  <div className="score-bar-container">
                    <div className="score-bar-fill" style={{ width: `${performer.score * 10}%` }}></div>
                  </div>
                  <span className="score-digit">{performer.score}</span>
                </div>
              </div>

              <div className="performer-status-tag">
                <span className={`perf-badge ${performer.status.toLowerCase().replace(' ', '-')}`}>
                  {performer.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceView;
