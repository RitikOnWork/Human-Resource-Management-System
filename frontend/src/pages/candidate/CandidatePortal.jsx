import React, { useState, useEffect } from "react";
import CandidateLayout from "../../components/CandidateLayout";
import { icons } from "../hr/views/Icons";
import "./candidate.css";
import CandidateProfile from "./CandidateProfile";

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
      if (!res.ok) return;
      
      const aRes = await fetch("/api/candidate/applications", { credentials: "include" });
      const aData = await aRes.json();
      setApplications(aData);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="emp-loading" style={{ background: 'var(--bg-primary)' }}>
      <div className="spinner" style={{ borderColor: 'var(--accent-purple)', borderTopColor: 'transparent' }}></div>
      <div style={{ color: 'var(--text-primary)', fontWeight: 800, marginTop: '1.5rem' }}>Preparing Talent Sync Hub...</div>
    </div>
  );

  return (
    <CandidateLayout activeTab={activeTab} onTabChange={setActiveTab}>
      
      {/* --- DASHBOARD VIEW --- */}
      {activeTab === 'dashboard' && (
        <div className="candidate-portal-view" style={{ animation: 'fadeIn 0.5s ease' }}>
          <header className="candidate-header" style={{ marginBottom: '4rem' }}>
            <h1 className="candidate-page-title">Welcome Back, {user?.name.split(' ')[0]}</h1>
            <p className="candidate-portal-subtitle">Optimizing your career trajectory with real-time talent analytics.</p>
          </header>

          <div className="candidate-grid">
            <div className="candidate-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--accent-purple)', fontSize: '1.5rem', marginBottom: '8px' }}>{icons.employee}</div>
              <h3 style={{ marginBottom: '4px' }}>Profile Strength</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-1px' }}>92%</div>
              <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Optimized Profile</div>
            </div>

            <div className="candidate-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--accent-purple)', fontSize: '1.5rem', marginBottom: '8px' }}>{icons.history}</div>
              <h3 style={{ marginBottom: '4px' }}>Active Tracking</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-1px' }}>{applications.length}</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Live Applications</div>
            </div>

            <div className="candidate-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--accent-purple)', fontSize: '1.5rem', marginBottom: '8px' }}>{icons.performance}</div>
              <h3 style={{ marginBottom: '4px' }}>Job Matches</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-1px' }}>{jobs.length}</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Available Openings</div>
            </div>
          </div>
        </div>
      )}

      {/* --- JOBS VIEW --- */}
      {activeTab === 'jobs' && ( activeTab === 'jobs' && (
        <div className="candidate-portal-view" style={{ animation: 'fadeIn 0.5s ease' }}>
          <h1 className="candidate-page-title">Explore Global Openings</h1>
          <p className="candidate-portal-subtitle">Discover high-impact roles tailored to your professional expertise.</p>
          
          <div className="candidate-filters">
            <div style={{ position: 'relative', flex: 1 }}>
              <input 
                type="text" 
                placeholder="Search job titles or departments..." 
                className="candidate-input"
                style={{ width: '100%', paddingLeft: '45px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>{icons.search}</span>
            </div>
          </div>

          <div className="job-listing-grid">
            {jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase())).map(job => {
              const hasApplied = applications.some(a => a.job_title === job.title);
              return (
                <div key={job._id} className="glass-job-card">
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <div className="job-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🏬 {job.department}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>📍 {job.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-purple)' }}>👤 {job.vacancies} Openings</span>
                    </div>
                  </div>
                  <button 
                    className={`apply-btn ${hasApplied ? 'applied' : ''}`}
                    onClick={() => !hasApplied && handleApply(job._id)}
                    disabled={hasApplied}
                  >
                    {hasApplied ? <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> APPLICATION SENT</span> : 'INITIATE APPLICATION'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* --- APPLICATIONS VIEW --- */}
      {activeTab === 'applications' && (
         <div className="candidate-portal-view" style={{ animation: 'fadeIn 0.5s ease' }}>
            <h1 className="candidate-page-title">Application Intelligence</h1>
            <p className="candidate-portal-subtitle">Advanced real-time tracking for your recruitment status.</p>
            
            <div className="candidate-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="payroll-table"> 
                <thead>
                  <tr>
                    <th>Job Architecture</th>
                    <th>Department</th>
                    <th>Submitted</th>
                    <th>Engagement Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.application_id}>
                      <td style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{app.job_title}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{app.department}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{new Date(app.applied_on).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${app.status === 'hired' ? 'approved' : app.status === 'rejected' ? 'rejected' : 'pending'}`}>
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)', fontWeight: 700 }}>No active recruitment cycles detected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
         </div>
      )}

      {/* --- PROFILE VIEW --- */}
      {activeTab === 'profile' && <CandidateProfile user={user} />}

      {/* --- SETTINGS VIEW --- */}
      {activeTab === 'settings' && (
        <div className="candidate-portal-view" style={{ animation: 'fadeIn 0.5s ease' }}>
          <h1 className="candidate-page-title">Account Configuration</h1>
          <p className="candidate-portal-subtitle">Manage your security preferences and communication protocols.</p>
          
          <div className="candidate-grid" style={{ gridTemplateColumns: 'minmax(340px, 1fr) minmax(400px, 1.5fr)' }}>
            <div className="candidate-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>{icons.settings}</span> System Preferences
                </h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Job Alerts</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Daily matches via email</span>
                  </div>
                  <button style={{ width: '50px', height: '26px', borderRadius: '30px', background: 'var(--accent-green)', border: 'none', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', right: '3px' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Two-Factor Security</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Extra layer of protection</span>
                  </div>
                  <button style={{ width: '50px', height: '26px', borderRadius: '30px', background: '#e2e8f0', border: 'none', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: '3px' }} />
                  </button>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', fontWeight: 600 }}>
                  <strong style={{ color: 'var(--accent-purple)', display: 'block', marginBottom: '4px' }}>Privacy Note:</strong>
                  Your personal data is encrypted and only visible to recruiters during active application cycles.
                </p>
              </div>
            </div>

            <div className="candidate-card">
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent-purple)' }}>{icons.performance}</span> Security Management
              </h3>
              
              <form className="login-form">
                <div className="form-group">
                  <label>Current Credentials</label>
                  <input type="password" placeholder="••••••••••••" className="candidate-input" style={{ width: '100%' }} />
                </div>
                
                <div className="form-group">
                  <label>New Secure Token</label>
                  <input type="password" placeholder="Minimum 12 characters" className="candidate-input" style={{ width: '100%' }} />
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1.5rem', borderRadius: '20px', margin: '1rem 0 2rem 0' }}>
                  <p style={{ color: '#92400e', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                    ⚠️ Changing your security credentials will terminate all active talent sessions.
                  </p>
                </div>

                <button type="button" className="apply-btn" style={{ width: '100%', justifyContent: 'center' }}>Update Security Shield</button>
              </form>
            </div>
          </div>
        </div>
      )}

    </CandidateLayout>
  );
}

export default CandidatePortal;
