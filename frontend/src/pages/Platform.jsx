import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Platform = () => {
  return (
    <div className="landing-page dark-premium">
      <header className="landing-header">
         <div className="container header-container">
            <Link to="/" className="brand" style={{textDecoration: 'none'}}>
              <div className="brand-logo">HR</div>
              <span className="brand-text">HRMS</span>
            </Link>
            <nav className="header-nav">
              <Link to="/platform" className="nav-link">Platform</Link>
              <Link to="/solutions" className="nav-link">Solutions</Link>
              <div className="auth-buttons">
                <Link to="/login" className="btn-signup">Sign In / Register</Link>
              </div>
            </nav>
         </div>
      </header>

      <section className="hero-section dark-premium" style={{ padding: '100px 0 60px 0', borderBottom: 'none' }}>
        <div className="hero-background">
          <div className="glow-purple"></div>
          <div className="grid-pattern-overlay"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 className="hero-title modern">The Comprehensive<br/><span className="text-gradient">HR Platform</span></h1>
          <p className="hero-subtitle modern" style={{ margin: '0 auto 40px auto' }}>
            Everything you need to manage your workforce from hire to retire, all in one securely unified platform.
          </p>
        </div>
      </section>

      <section className="features-section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Core HR & Automation</h3>
              <p>Automate onboarding, policy rollouts, and multi-tier approval workflows seamlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Intelligent Payroll</h3>
              <p>Error-free payroll synced directly with attendance, tax deductions, and compliance rules.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Performance Management</h3>
              <p>Continuous feedback, 360° reviews, and KPI tracking linked directly to business goals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Talent Acquisition</h3>
              <p>AI-driven candidate matching and centralized interviewing pipelines.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕒</div>
              <h3>Geo-Fenced Time Tracking</h3>
              <p>Real-time location verified attendance to prevent buddy-punching.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Enterprise Security</h3>
              <p>Bank-grade encryption, Role-based Access Control, and comprehensive audit logs.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container footer-container">
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/compliance">Enterprise Security</Link>
            <Link to="/contact">Contact Support</Link>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2026 HRMS. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Platform;
