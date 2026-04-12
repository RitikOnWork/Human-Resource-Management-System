import React, { useState, useEffect } from "react";
import CandidateLayout from "../../components/CandidateLayout";
import { icons } from "../hr/views/Icons";
import "./candidate.css";

function CandidatePortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // --- Fetch Initial Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uRes = await fetch("/api/candidate/dashboard", { credentials: "include" });
        const uData = await uRes.json();
        setUser(uData.user);

        const jRes = await fetch("/api/candidate/jobs", { credentials: "include" });
        const jData = await jRes.json();
        setJobs(jData);

        const aRes = await fetch("/api/candidate/applications", { credentials: "include" });
        const aData = await aRes.json();
        setApplications(aData);

        setLoading(false);
      } catch (err) {
        console.error("Fetch failed", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const res = await fetch("/api/candidate/apply", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      alert("Application Submitted Successfully!");
      // Refresh applications
      const aRes = await fetch("/api/candidate/applications", { credentials: "include" });
      const aData = await aRes.json();
      setApplications(aData);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="emp-loading"><div className="spinner"></div>Preparing Talent Portal...</div>;

  return (
    <CandidateLayout activeTab={activeTab} onTabChange={setActiveTab}>
      
      {/* --- DASHBOARD VIEW --- */}
      {activeTab === 'dashboard' && (
        <div className="candidate-portal-view">
          <header className="candidate-header">
            <h1 className="candidate-page-title">Welcome, {user?.name.split(' ')[0]}</h1>
            <p className="emp-subtitle">Your career journey at HRSync starts here.</p>
          </header>

          <div className="candidate-grid">
            <div className="candidate-card">
              <h3>{icons.performance} Profile Strength</h3>
              <div className="stat-large">85%</div>
              <p className="stat-sub positive">Excellent Profile</p>
              <button className="emp-action-link" onClick={() => setActiveTab('profile')}>Complete Profile {icons.arrowRight}</button>
            </div>

            <div className="candidate-card">
              <h3>{icons.history} Active Applications</h3>
              <div className="stat-large">{applications.length}</div>
              <p className="stat-sub">Tracked in real-time</p>
              <button className="emp-action-link" onClick={() => setActiveTab('applications')}>View Status {icons.arrowRight}</button>
            </div>

            <div className="candidate-card">
              <h3>{icons.calendar} Recommended Jobs</h3>
              <div className="stat-large">{jobs.length}</div>
              <p className="stat-sub">New matches today</p>
              <button className="emp-action-link" onClick={() => setActiveTab('jobs')}>Explore All {icons.arrowRight}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- JOBS VIEW --- */}
      {activeTab === 'jobs' && (
        <div className="candidate-portal-view">
          <h2 className="candidate-page-title">Global Career Opportunities</h2>
          
          <div className="candidate-filters">
            <input 
              type="text" 
              placeholder="Search by Job Title..." 
              className="candidate-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="candidate-input" style={{ flex: 0.5 }}>
              <option>All Locations</option>
              <option>Remote</option>
              <option>Headquarters</option>
            </select>
          </div>

          <div className="job-listing-grid">
            {jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase())).map(job => {
              const hasApplied = applications.some(a => a.job_title === job.title);
              return (
                <div key={job._id} className="glass-job-card">
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <div className="job-meta">
                      <span>🏙️ {job.department}</span>
                      <span>📍 {job.location}</span>
                      <span>🎟️ {job.vacancies} Vacancies</span>
                    </div>
                  </div>
                  <button 
                    className={`apply-btn ${hasApplied ? 'applied' : ''}`}
                    onClick={() => !hasApplied && handleApply(job._id)}
                    disabled={hasApplied}
                  >
                    {hasApplied ? 'ALREADY APPLIED' : 'APPLY NOW'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ... other tabs ... */}
      {activeTab === 'applications' && (
         <div className="candidate-portal-view">
            <h2 className="candidate-page-title">Application History</h2>
            <div className="candidate-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="leave-table"> {/* Reuse existing table styles */}
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Dept.</th>
                    <th>Submission Date</th>
                    <th>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.application_id}>
                      <td className="type-cell"><strong>{app.job_title}</strong></td>
                      <td>{app.department}</td>
                      <td>{new Date(app.applied_on).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${app.status === 'hired' ? 'badge-success' : app.status === 'rejected' ? 'badge-danger' : 'badge-warning'}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
      )}

    </CandidateLayout>
  );
}

export default CandidatePortal;
