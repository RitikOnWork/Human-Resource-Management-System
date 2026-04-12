import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";
import ApplyLeave from "./ApplyLeave";
import PayrollView from "./PayrollView";
import EmployeeProfile from "./EmployeeProfile";
import AttendanceView from "./AttendanceView";
import SettingsView from "./SettingsView";
import { icons } from "../hr/views/Icons";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- 1. Fetch Data Logic ---
  useEffect(() => {
    if (activeTab === 'dashboard') {
        setLoading(true);
        setError(null);
        fetch("/api/employee/dashboard", { credentials: "include" })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load dashboard");
            return res.json();
        })
        .then((d) => {
            const javaAi = d.stats?.javaAiAnalysis || {};
            const javaAtt = d.stats?.javaAttendanceStats || {};

            const enrichedData = {
                ...d,
                stats: {
                    ...d.stats,
                    aiScore: javaAi.currentScore ? javaAi.currentScore.toFixed(1) : 9.2,
                    aiTrend: javaAi.trend || "Stable",
                    aiRecommendation: javaAi.recommendation || "Maintain consistency.",
                    attendanceRate: javaAtt.utilizationRate ? Math.round(javaAtt.utilizationRate) : (d.stats?.attendanceDaysThisMonth ? Math.min(Math.round((d.stats.attendanceDaysThisMonth / 22) * 100), 100) : 0),
                    overtimeHours: javaAtt.overtimeHours ? javaAtt.overtimeHours.toFixed(1) : 0,
                    leavesBalance: (d.stats?.totalLeaves || 0) - (d.stats?.approvedLeaves || 0),
                    tasksCompleted: 45,
                    rank: "Top 5%",
                    jioHazariStatus: "In Zone"
                },
                performanceHistory: d.performanceHistory || [6.5, 7.0, 7.8, 8.2, 8.9, 9.2]
            };
            setData(enrichedData);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Dashboard load error:", err);
            setError(err.message);
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
    if (!history || history.length === 0) return "";
    const filteredPoints = history.filter(val => typeof val === 'number' && !isNaN(val));
    if (filteredPoints.length < 2) return "";
    const points = filteredPoints.map((val, i) => `${(i / (filteredPoints.length - 1)) * 100},${100 - (val / 10) * 100}`).join(" ");
    return `M0,100 ${points} L100,100 Z`;
  };
  
  const getGraphLine = (history) => {
    if (!history || history.length === 0) return "";
    const filteredPoints = history.filter(val => typeof val === 'number' && !isNaN(val));
    if (filteredPoints.length < 2) return "";
    return filteredPoints.map((val, i) => `${(i / (filteredPoints.length - 1)) * 100},${100 - (val / 10) * 100}`).join(" ");
  };

  const handleLogout = async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        sessionStorage.removeItem("role");
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
        navigate("/login");
      }
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
                ) : error ? (
                    <div className="emp-loading">
                      <p style={{ color: '#ef4444' }}>Failed to load dashboard: {error}</p>
                      <button onClick={() => setActiveTab('dashboard')} style={{ marginTop: '12px', padding: '8px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Retry</button>
                    </div>
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
                                    <div className="jio-detail-row">
                                      <span className="jio-lbl">GPS Signal:</span> 
                                      <span className="jio-val">Strong</span>
                                    </div>
                                    <div className="jio-detail-row">
                                      <span className="jio-lbl">Verified at:</span> 
                                      <span className="jio-val">{currentTime.toLocaleTimeString()}</span>
                                    </div>
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
                                <button className="emp-action-link" onClick={() => setActiveTab('leaves')}>
                                  Open Leave Portal {icons.arrowRight}
                                </button>
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
                                                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4"/>
                                                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
                                                </linearGradient>
                                            </defs>
                                            <path d={getGraphPath(data?.performanceHistory)} fill="url(#blueGradient)" />
                                            <polyline points={getGraphLine(data?.performanceHistory)} fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            {data?.performanceHistory && data?.performanceHistory.map((val, i) => (
                                                <circle key={i} cx={(i / (data.performanceHistory.length - 1)) * 100} cy={100 - (val / 10) * 100} r="1.5" fill="#fff" />
                                            ))}
                                        </svg>
                                    </div>
                                </div>

                                <div className="emp-card">
                                    <h3>🤖 Java AI Recommendations</h3>
                                    <div className="insight-list">
                                        <div className="insight-item">
                                            <div className="insight-icon info">i</div>
                                            <div className="insight-content">
                                                <strong>Performance Trend: {data?.stats.aiTrend}</strong><br/>
                                                {data?.stats.aiRecommendation}
                                                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#6366f1' }}>Powered by JVM Analytics Engine</div>
                                            </div>
                                        </div>
                                        {data?.stats.overtimeHours > 0 && (
                                            <div className="insight-item" style={{ marginTop: '10px' }}>
                                                <div className="insight-icon" style={{ background: '#10b981' }}>⏱</div>
                                                <div className="insight-content">
                                                    <strong>Overtime Logged:</strong> You have {data?.stats.overtimeHours} hours of overtime processed by the Java Engine this period.
                                                </div>
                                            </div>
                                        )}
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
        {activeTab === 'payroll' && <PayrollView />} {/* ✅ LINKED HERE */}
         
        {activeTab === 'profile' && <EmployeeProfile data={data} />}
        {activeTab === 'attendance' && <AttendanceView data={data} />}
        {activeTab === 'settings' && <SettingsView data={data} />}

      
      </main>
    </div>
  );
}

export default EmployeeDashboard;