import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar"; 
import "../employee/EmployeeDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- 1. Fetch Data Logic ---
  useEffect(() => {
    if (activeTab === 'dashboard') {
        fetch("/api/manager/dashboard", { credentials: "include" })
        .then((res) => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then((d) => {
            setData(d);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Failed to load dashboard data.", err);
            setData({ error: true });
            setLoading(false);
        });
    }
  }, [activeTab]);

  // --- Clock Timer ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await import('../../services/auth').then(m => m.logout());
      navigate('/login');
    } catch (e) {
      console.error('Logout failed', e);
      navigate('/login');
    }
  };

  return (
    <div className="emp-layout">
      {/* Sidebar Component */}
      <ManagerSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="emp-content-area">
        
        {/* --- VIEW: DASHBOARD --- */}
        {activeTab === 'dashboard' && (
            <>
                {loading ? (
                    <div className="emp-loading"><div className="spinner"></div>Loading Dashboard...</div>
                ) : data?.error ? (
                    <div className="emp-error-state" style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(30,30,40,0.5)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", marginTop: "2rem" }}>
                        <h2 style={{ color: "#f87171", marginBottom: "1rem" }}>Could not load dashboard. Please refresh.</h2>
                        <button onClick={() => window.location.reload()} style={{ padding: "0.75rem 1.5rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "0.2s" }}>Refresh Page</button>
                    </div>
                ) : (
                    <div className="emp-dashboard-container">
                        
                        {/* Header */}
                        <header className="emp-header">
                            <div>
                                <h1>Welcome, {data?.user?.name ? data.user.name.split(' ')[0] : 'Manager'}</h1>
                                <p className="emp-subtitle">Here is your team's snapshot.</p>
                            </div>
                            <div className="emp-header-right">
                                <div className="live-clock">
                                    <span className="time">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="date">{currentTime.toLocaleDateString()}</span>
                                </div>
                                <div className="emp-profile-pill">
                                    <div className="emp-avatar">{(data?.user?.name || 'M').charAt(0)}</div>
                                    <span>{data?.user?.role || 'Manager'}</span>
                                </div>
                            </div>
                        </header>

                        {/* Top Stats Grid */}
                        <div className="emp-stats-grid">
                            <div className="emp-card">
                                <div className="card-label">Team Attendance</div>
                                <div className="stat-large">{data?.teamAttendance?.present || 0} / {data?.teamAttendance?.total || 0}</div>
                                <div className="stat-sub">Present Team Members</div>
                            </div>

                            <div className="emp-card">
                                <div className="card-label">Leave Approvals</div>
                                <div className="stat-large">{data?.pendingLeaves || 0}</div>
                                <div className="stat-sub">Requires your action</div>
                            </div>
                            
                            <div className="emp-card">
                                <div className="card-label">Team Members</div>
                                <div className="stat-large">{data?.teamMembers?.length || 0}</div>
                                <div className="stat-sub">Active in your department</div>
                            </div>
                        </div>

                        {/* Main Layout Grid */}
                        <div className="emp-main-layout">
                            <div className="emp-column-main">
                                <div className="emp-card">
                                    <h3>Team Members List</h3>
                                    {data?.teamMembers && data.teamMembers.length > 0 ? (
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                                            {data.teamMembers.map((member, i) => (
                                                <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)'}}>
                                                    <div>
                                                        <strong>{member.name}</strong>
                                                        <div style={{fontSize: '0.85rem', color: '#9ca3af'}}>{member.role}</div>
                                                    </div>
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        <span className={`badge ${member.status?.toLowerCase() === 'active' ? 'active' : ''}`}>{member.status || 'Unknown'}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p style={{color: '#9ca3af', marginTop: '15px'}}>No team members currently found.</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="emp-column-side">
                                <div className="emp-card profile-details-card">
                                    <h3>Quick Actions</h3>
                                    <button className="btn-full-width" onClick={() => setActiveTab('leave_approvals')} style={{marginBottom: '10px'}}>Review Leaves</button>
                                    <button className="btn-full-width" onClick={() => setActiveTab('team_attendance')}>View Full Roster</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )}

        {/* --- OTHER TABS --- */}
        {activeTab === 'team_attendance' && <div className="placeholder-view"><h2>Team Attendance</h2><p>Attendance tracking for your team.</p></div>}
        {activeTab === 'leave_approvals' && <div className="placeholder-view"><h2>Leave Approvals</h2><p>Pending leaves awaiting your review.</p></div>}
        {activeTab === 'team_members' && <div className="placeholder-view"><h2>Team Members Directory</h2><p>Full team directory goes here.</p></div>}
      
      </main>
    </div>
  );
}

export default ManagerDashboard;
