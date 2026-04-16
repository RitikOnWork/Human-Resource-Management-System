import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Bot, Target, Star } from 'lucide-react';
import './landing.css';

const Landing = () => {

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
                <span>Workforce Synced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI Recruitment Section --- */}
      <section className="ai-recruitment-section">
        <div className="container">
          <div className="ai-header-grid">
            <h2 className="ai-title">AI-Powered Recruitment<br />Engine</h2>
            <p className="ai-subtitle">Faster hiring. Reduced bias. Best-fit talent automatically surfaced.</p>
          </div>

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

      {/* --- Features Section --- */}
      <section className="features-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Everything you need to run your organization</h2>
            <p className="section-description">Built for enterprise scale and administrative efficiency.</p>
          </div>
          
          <div className="features-grid">
            <Link to="/platform" className="feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="feature-icon">💰</div>
              <h3>Automated Payroll</h3>
              <p>Execute payroll cycles in minutes with built-in tax compliance and automated direct deposits for your entire global team.</p>
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