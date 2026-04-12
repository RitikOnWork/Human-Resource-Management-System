import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import AdminLayout from "../../components/AdminLayout";
import apiFetch from "../../services/api"; 
import "./admin.css";

import * as Data from "../hr/views/DashboardData";
import { icons } from "../hr/views/Icons";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    apiFetch("/api/admin/dashboard")
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load dashboard", err));
  }, []);

  return (
    <AdminLayout>
      <div className="command-center-header">
        <div className="command-title-group">
          <h2 className="admin-title">Admin Command Center</h2>
          <p className="admin-subtitle">Enterprise-wide operational overview</p>
        </div>
        
        <Link to="/admin/create-job" style={{ textDecoration: 'none' }}>
          <button className="primary-btn">
            {icons.plus || '+'} Create New Job Openings
          </button>
        </Link>
      </div>

      <div className="command-metrics-grid">
        {Data.adminCommandMetrics.map(metric => (
          <div key={metric.label} className="command-metric-card">
            <div className="metric-card-icon">{icons[metric.icon] || '📊'}</div>
            <div className="metric-card-info">
              <span className="metric-card-label">{metric.label}</span>
              <div className="metric-card-value">{metric.value}</div>
              {metric.trend !== 0 && (
                <span className={`metric-card-trend ${metric.trend > 0 ? 'up' : 'down'}`}>
                  {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}% vs last month
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="jobs-section-header">
        <h3>Active Recruitment Streams</h3>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (

          <div key={job._id} className="job-card">
            <h4>{job.title}</h4>
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Status:</strong> <span className="status-value">{job.status}</span></p>
            <p><strong>Vacancies:</strong> {job.vacancies}</p>

            <div style={{ marginTop: '15px' }}>
              <Link to={`/admin/job/${job._id}/applications`}>
                <button className="btn-view-apps">
                  View Applications
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;