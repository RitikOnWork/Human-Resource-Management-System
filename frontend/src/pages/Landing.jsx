import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock, MapPin, Clock, CheckCircle, FileText, Bot, Target, Star } from 'lucide-react';
import './landing.css';

const Landing = () => {
  const [inZone, setInZone] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');

  const roleData = {
    admin: {
      title: 'Admin Command Center',
      metrics: [
        { value: '12466', label: 'ACTIVE WORKFORCE' },
        { value: '94.2%', label: 'DEPARTMENT EFFICIENCY' },
        { value: '23', label: 'AI ALERTS TODAY' }
      ]
    },
    employee: {
      title: 'Employee Portal',
      metrics: [
        { value: '98%', label: 'ATTENDANCE RATE' },
        { value: '4', label: 'AVAILABLE LEAVES' },
        { value: '1', label: 'PENDING TASKS' }
      ]
    },
    candidate: {
      title: 'Career Hub',
      metrics: [
        { value: '3', label: 'ACTIVE APPLICATIONS' },
        { value: '85%', label: 'PROFILE MATCH' },
        { value: '2', label: 'UPCOMING INTERVIEWS' }
      ]
    }
  };

  return (
    <>

      {/* --- Hero Section --- */}
      <section className="hero-section dark-premium">
        <div className="hero-background">
          <div className="glow-purple"></div>
          <div className="glow-blue"></div>
          <div className="grid-pattern-overlay"></div>
        </div>
        <div className="container hero-grid">
          <div className="hero-left">
            <h1 className="hero-title modern">
              Transform Your<br/>
              <span className="text-gradient">Workforce Management</span>
            </h1>
            <p className="hero-subtitle modern">
              All-in-one HRMS to manage hiring, payroll, attendance, and performance
            </p>
            <div className="hero-cta-group modern">
              <Link to="/login" className="btn-modern-primary">Get Started</Link>
              <Link to="/demo" className="btn-modern-secondary">Book Demo</Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="dashboard-glass">
              <div className="dash-top-bar">
                <div className="dash-dot red"></div>
                <div className="dash-dot yellow"></div>
                <div className="dash-dot green"></div>
              </div>
              <div className="dash-content">
                <div className="dash-chart">
                  <div className="bar b1"></div>
                  <div className="bar b2"></div>
                  <div className="bar b3"></div>
                  <div className="bar b4"></div>
                  <div className="bar b5"></div>
                </div>
                <div className="dash-cards">
                  <div className="dash-mini-card">
                    <span>Active Employees</span>
                    <strong>1,248</strong>
                  </div>
                  <div className="dash-mini-card">
                    <span>Performance</span>
                    <strong>+24%</strong>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="floating-element float-1">
                <div className="icon-wrapper">✓</div>
                <span>Payroll Processed</span>
              </div>
              <div className="floating-element float-2">
                <div className="icon-wrapper">🗓</div>
                <span>Attendance Synced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Interactive Geo-Fencing Demo Section --- */}
      <section className="geo-demo-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Location-Verified Attendance</h2>
            <p className="section-description">Ensure your workforce is exactly where they need to be.</p>
          </div>
          
          <div className="geo-demo-grid">
            {/* Left: Mobile Phone Mockup */}
            <div className="mobile-mockup-wrapper">
              <div className="mobile-phone">
                <div className="mobile-status-bar">
                  <span>9:41</span>
                  <div className="status-icons">
                    <span style={{fontSize: '10px'}}>📶</span>
                    <span style={{fontSize: '10px'}}>🔋</span>
                  </div>
                </div>
                <div className="mobile-map-area">
                  <div className={`map-zone ${inZone ? 'active' : ''}`}>
                    <span className="zone-label">Office Zone</span>
                  </div>
                  <div className={`map-pin ${inZone ? 'inside' : 'outside'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} color={inZone ? '#10b981' : '#ef4444'} />
                  </div>
                </div>
                <div className="mobile-bottom">
                  <div className={`status-pill ${inZone ? 'success' : 'locked'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {inZone ? <><Unlock size={16} /> Inside Zone</> : <><Lock size={16} /> Outside Zone</>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Demo Controls & Features */}
            <div className="geo-demo-controls">
              <h3 className="demo-title">Try it yourself:</h3>
              <div className="demo-buttons">
                <button 
                  className="btn-simulate"
                  onClick={() => setInZone(true)}
                  disabled={inZone}
                >
                  Simulate Zone Entry
                </button>
                <button 
                  className="btn-reset"
                  onClick={() => setInZone(false)}
                  disabled={!inZone}
                >
                  Reset Demo
                </button>
              </div>

              <div className="demo-feature-list">
                <div className="demo-feature-item">
                  <span className="df-icon" style={{ display: 'flex', alignItems: 'center' }}><Lock size={20} color="#a78bfa" /></span>
                  <span>Location-locked attendance</span>
                </div>
                <div className="demo-feature-item">
                  <span className="df-icon" style={{ display: 'flex', alignItems: 'center' }}><MapPin size={20} color="#a78bfa" /></span>
                  <span>GPS + Geo-fence verification</span>
                </div>
                <div className="demo-feature-item">
                  <span className="df-icon" style={{ display: 'flex', alignItems: 'center' }}><Clock size={20} color="#a78bfa" /></span>
                  <span>Timestamp + location logged</span>
                </div>
                <div className="demo-feature-item">
                  <span className="df-icon" style={{ display: 'flex', alignItems: 'center' }}><CheckCircle size={20} color="#a78bfa" /></span>
                  <span>Audit-proof records</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI Recruitment Section --- */}
      <section className="ai-recruitment-section">
        <div className="container">
          {/* Header */}
          <div className="ai-header-grid">
            <h2 className="ai-title">AI-Powered Recruitment<br />Engine</h2>
            <p className="ai-subtitle">Faster hiring. Reduced bias. Best-fit talent automatically surfaced.</p>
          </div>

          {/* Workflow Diagram */}
          <div className="ai-workflow">
            <div className="ai-flow-step">
              <div className="ai-circle"><FileText size={32} color="#06b6d4" /></div>
              <span>Job Description</span>
            </div>
            <div className="ai-arrow">→</div>
            
            <div className="ai-flow-step">
              <div className="ai-circle"><Bot size={32} color="#06b6d4" /></div>
              <span>AI Analysis</span>
            </div>
            <div className="ai-arrow">→</div>

            <div className="ai-flow-step">
              <div className="ai-circle"><Target size={32} color="#06b6d4" /></div>
              <span>Skill Matching</span>
            </div>
            <div className="ai-arrow">→</div>

            <div className="ai-flow-step">
              <div className="ai-circle"><Star size={32} color="#06b6d4" /></div>
              <span>Ranked Shortlist</span>
            </div>
          </div>

          {/* Candidate Match Cards */}
          <div className="ai-candidates-grid">
            <div className="ai-candidate-card">
              <h4>Candidate A</h4>
              <div className="ai-skill-match">
                <div className="match-label">SKILL MATCH</div>
                <div className="match-bar-bg">
                  <div className="match-bar-fill" style={{ width: '94%' }}></div>
                </div>
                <div className="match-percentage">94%</div>
              </div>
            </div>

            <div className="ai-candidate-card">
              <h4>Candidate B</h4>
              <div className="ai-skill-match">
                <div className="match-label">SKILL MATCH</div>
                <div className="match-bar-bg">
                  <div className="match-bar-fill" style={{ width: '89%' }}></div>
                </div>
                <div className="match-percentage">89%</div>
              </div>
            </div>

            <div className="ai-candidate-card">
              <h4>Candidate C</h4>
              <div className="ai-skill-match">
                <div className="match-label">SKILL MATCH</div>
                <div className="match-bar-bg">
                  <div className="match-bar-fill" style={{ width: '86%' }}></div>
                </div>
                <div className="match-percentage">86%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Role Dashboards Section --- */}
      <section className="role-dashboard-section">
        <div className="container">
          <div className="roles-tabs-container">
            <div className="roles-tabs-bg">
              <button 
                className={`role-tab ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin')}
              >
                Admin / HR
              </button>
              <button 
                className={`role-tab ${activeTab === 'employee' ? 'active' : ''}`}
                onClick={() => setActiveTab('employee')}
              >
                Employee
              </button>
              <button 
                className={`role-tab ${activeTab === 'candidate' ? 'active' : ''}`}
                onClick={() => setActiveTab('candidate')}
              >
                Candidate
              </button>
            </div>
          </div>

          <div className="role-dashboard-content">
            <h2 className="role-dashboard-title">{roleData[activeTab].title}</h2>
            
            <div className="role-metrics-grid">
              {roleData[activeTab].metrics.map((metric, idx) => (
                <div key={idx} className="role-metric-card">
                  <div className="role-metric-value">
                    {metric.value.replace('%', '')}
                    {metric.value.includes('%') && <span className="percent-sign">%</span>}
                  </div>
                  <div className="role-metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Top Performers Section --- */}
      <section className="top-performers-section">
        <div className="container">
          <div className="performers-container">
            <h2 className="performers-title">Top Performers — Organization Wide</h2>
            <div className="performers-list-wrapper">
              <div className="performers-list">
                
                <div className="performer-row">
                  <div className="performer-rank">#1</div>
                  <div className="performer-info">
                    <div className="performer-name">Rajesh Kumar</div>
                    <div className="performer-dept">Engineering</div>
                  </div>
                  <div className="performer-score">9.8</div>
                </div>

                <div className="performer-row">
                  <div className="performer-rank">#2</div>
                  <div className="performer-info">
                    <div className="performer-name">Priya Singh</div>
                    <div className="performer-dept">Product Management</div>
                  </div>
                  <div className="performer-score">9.6</div>
                </div>

                <div className="performer-row">
                  <div className="performer-rank">#3</div>
                  <div className="performer-info">
                    <div className="performer-name">Amit Verma</div>
                    <div className="performer-dept">Customer Success</div>
                  </div>
                  <div className="performer-score">9.4</div>
                </div>

                <div className="performer-row">
                  <div className="performer-rank">#4</div>
                  <div className="performer-info">
                    <div className="performer-name">Sneha Patel</div>
                    <div className="performer-dept">Administration</div>
                  </div>
                  <div className="performer-score">9.3</div>
                </div>

                {/* Additional rows for scroll effect */}
                <div className="performer-row">
                  <div className="performer-rank">#5</div>
                  <div className="performer-info">
                    <div className="performer-name">Vikram Sharma</div>
                    <div className="performer-dept">Sales</div>
                  </div>
                  <div className="performer-score">9.1</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="features-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Everything you need to run your organization</h2>
            <p className="section-description">Built for enterprise scale and administrative efficiency.</p>
          </div>
          
          <div className="features-grid">
            {/* Wrapped the card in a Link to make it clickable */}
            <Link to="/platform" className="feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="feature-icon">📍</div>
              <h3>Geo-Fenced Attendance</h3>
              <p>Jio-Hazari ensures workers are exactly where they need to be, eliminating ghost workers and verifying locations instantly.</p>
            </Link>

            <Link to="/platform" className="feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="feature-icon">📊</div>
              <h3>Admin Command Center</h3>
              <p>Get a bird's-eye view of all departments, approve leave requests, and manage workforce distribution from one unified dashboard.</p>
            </Link>

            <Link to="/platform" className="feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="feature-icon">🤖</div>
              <h3>Smart Recruitment</h3>
              <p>Automated skill matching and unbiased candidate ranking to ensure your organization hires the best possible talent.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Bottom CTA Section --- */}
      <section className="bottom-cta-section">
        <div className="cta-glow"></div>
        <div className="container bottom-cta-content">
          <h2 className="bottom-cta-title">Ready to Transform Your Organization?</h2>
          <p className="bottom-cta-subtitle">
            Join thousands of enterprises scaling their workforce securely and efficiently.
          </p>
          <div className="bottom-cta-buttons">
            <Link to="/login" className="btn-modern-primary">Get Started Now</Link>
            <Link to="/demo" className="btn-modern-secondary">Book a Demo</Link>
          </div>
        </div>
      </section>

    </>
  );
};

export default Landing;