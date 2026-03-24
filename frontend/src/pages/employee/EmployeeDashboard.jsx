import React, { useEffect, useState } from "react";
import EmployeeSidebar from "./EmployeeSidebar"; 
import ApplyLeave from "./ApplyLeave"; // ✅ IMPORT ADDED
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- 1. Fetch Data Logic ---
  useEffect(() => {
    if (activeTab === 'dashboard') {
        fetch("/api/employee/dashboard", { credentials: "include" })
        .then((res) => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then((d) => {
            const enrichedData = {
                ...d,
                stats: {
                    aiScore: 9.2,
                    attendanceRate: 96,
                    leavesBalance: 12,
                    tasksCompleted: 45,
                    rank: "Top 5%",
                    jioHazariStatus: "In Zone"
                },
                performanceHistory: [6.5, 7.0, 7.8, 8.2, 8.9, 9.2]
            };
            setData(enrichedData);
            setLoading(false);
        })
        .catch((err) => {
            console.warn("Using Fallback Data");
            const fallbackData = {
                user: { name: "Abhishek Pandey", email: "abhishek@municipal.gov", role: "Field Officer" },
                employee: { employee_code: "EMP-2026-001", department: "Sanitation", position: "Supervisor", status: "Active" },
                stats: { aiScore: 9.2, attendanceRate: 98, leavesBalance: 8, tasksCompleted: 142, rank: "Top 5%", jioHazariStatus: "In Zone" },
                performanceHistory: [6.5, 7.2, 7.8, 8.5, 8.9, 9.2]
            };
            setData(fallbackData);
            setLoading(false);
        });
    }
  }, [activeTab]);

  // --- Clock Timer ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Graph Helpers ---
  const getGraphPath = (history) => {
    if (!history) return "";
    const points = history.map((val, i) => `${(i / 5) * 100},${100 - (val / 10) * 100}`).join(" ");
    return `M0,100 ${points} L100,100 Z`;
  };
  
  const getGraphLine = (history) => {
    if (!history) return "";
    return history.map((val, i) => `${(i / 5) * 100},${100 - (val / 10) * 100}`).join(" ");
  };

  const handleLogout = () => {
      alert("Logging out...");
  };

  return (
    <div className="emp-layout">
      {/* Sidebar Component */}
      <EmployeeSidebar 
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
                ) : (
                    <div className="emp-dashboard-container">
                        
                        {/* Header */}
                        <header className="emp-header">
                            <div>
                                <h1>Welcome, {data?.user?.name.split(' ')[0]}</h1>
                                <p className="emp-subtitle">Here is your daily performance snapshot.</p>
                            </div>
                            <div className="emp-header-right">
                                <div className="live-clock">
                                    <span className="time">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="date">{currentTime.toLocaleDateString()}</span>
                                </div>
                                <div className="emp-profile-pill">
                                    <div className="emp-avatar">{data?.user?.name.charAt(0)}</div>
                                    <span>{data?.user?.role}</span>
                                </div>
                            </div>
                        </header>

                        {/* Top Stats Grid */}
                        <div className="emp-stats-grid">
                            <div className="emp-card ai-score-card">
                                <div className="card-label">AI Performance Score</div>
                                <div className="score-display">
                                    <span className="big-score">{data?.stats.aiScore}</span>
                                    <span className="total-score">/10</span>
                                </div>
                                <div className="score-rank">🏆 {data?.stats.rank} in Dept</div>
                                <div className="score-bar-bg">
                                    <div className="score-bar-fill" style={{width: `${data?.stats.aiScore * 10}%`}}></div>
                                </div>
                            </div>

                            <div className={`emp-card jio-card ${data?.stats.jioHazariStatus === 'In Zone' ? 'active' : 'inactive'}`}>
                                <div className="card-top">
                                    <div className="card-label">Jio-Hazari Status</div>
                                    <div className="live-dot"></div>
                                </div>
                                <div className="jio-status-text">
                                    {data?.stats.jioHazariStatus === 'In Zone' ? 'YOU ARE IN ZONE' : 'OUT OF ZONE'}
                                </div>
                                <div className="jio-details">
                                    <span>GPS Signal: Strong</span>
                                    <span>Verified: {currentTime.toLocaleTimeString()}</span>
                                </div>
                            </div>

                            <div className="emp-card">
                                <div className="card-label">Monthly Attendance</div>
                                <div className="stat-large">{data?.stats.attendanceRate}%</div>
                                <div className="stat-sub positive">Excellent Record</div>
                            </div>

                            <div className="emp-card">
                                <div className="card-label">Leave Balance</div>
                                <div className="stat-large">{data?.stats.leavesBalance} <span className="unit">Days</span></div>
                                <button className="btn-text" onClick={() => setActiveTab('leaves')}>Apply Leave →</button>
                            </div>
                        </div>

                        {/* Main Layout Grid */}
                        <div className="emp-main-layout">
                            <div className="emp-column-main">
                                <div className="emp-card graph-card">
                                    <div className="card-header-row">
                                        <h3>Performance Trend (6 Months)</h3>
                                        <select className="graph-filter"><option>This Year</option></select>
                                    </div>
                                    <div className="graph-container">
                                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="emp-trend-svg">
                                            <defs>
                                                <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3"/>
                                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
                                                </linearGradient>
                                            </defs>
                                            <path d={getGraphPath(data?.performanceHistory)} fill="url(#blueGradient)" />
                                            <polyline points={getGraphLine(data?.performanceHistory)} fill="none" stroke="#2563eb" strokeWidth="2" />
                                            {data?.performanceHistory.map((val, i) => (
                                                <circle key={i} cx={(i / 5) * 100} cy={100 - (val / 10) * 100} r="2" fill="#fff" stroke="#2563eb" strokeWidth="1" />
                                            ))}
                                        </svg>
                                    </div>
                                </div>

                                <div className="emp-card">
                                    <h3>🤖 AI Recommendations</h3>
                                    <div className="insight-list">
                                        <div className="insight-item">
                                            <div className="insight-icon info">i</div>
                                            <div className="insight-content">
                                                <strong>Tip:</strong> Check in before 9:00 AM for the next 3 days to boost your score to 9.5.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="emp-column-side">
                                <div className="emp-card profile-details-card">
                                    <h3>Employee Profile</h3>
                                    <div className="detail-row"><span className="lbl">Code:</span> <span className="val">{data?.employee.employee_code}</span></div>
                                    <div className="detail-row"><span className="lbl">Dept:</span> <span className="val">{data?.employee.department}</span></div>
                                    <div className="detail-row"><span className="lbl">Status:</span> <span className="badge active">{data?.employee.status}</span></div>
                                    <button className="btn-full-width">Update Profile</button>
                                </div>
                                <div className="emp-card">
                                    <h3>Quick Actions</h3>
                                    <div className="action-grid">
                                        <button className="action-box">📝<br/>Log Task</button>
                                        <button className="action-box">📅<br/>History</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )}

        {/* --- OTHER TABS --- */}
        {activeTab === 'leaves' && <ApplyLeave />}  {/* ✅ LINKED HERE */}
         
        {activeTab === 'profile' && <div className="placeholder-view"><h2>My Profile View</h2><p>Profile update form goes here.</p></div>}
        {activeTab === 'attendance' && <div className="placeholder-view"><h2>Attendance Calendar</h2><p>Calendar component goes here.</p></div>}
        {activeTab === 'payroll' && <div className="placeholder-view"><h2>Payroll & Salary</h2><p>Salary slips list goes here.</p></div>}
        {activeTab === 'settings' && <div className="placeholder-view"><h2>Settings</h2><p>Account settings go here.</p></div>}
      
      </main>
    </div>
  );
}

export default EmployeeDashboard;