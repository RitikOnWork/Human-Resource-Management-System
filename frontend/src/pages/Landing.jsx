import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* --- Navigation Header --- */}
      <header className="landing-header">
        <div className="container header-container">
          <div className="brand">
            <div className="brand-logo">NY</div>
            <span className="brand-text">Nagar Yukt HRMS</span>
          </div>
          <nav className="header-nav">
            <Link to="/platform" className="nav-link">Platform</Link>
            <Link to="/solutions" className="nav-link">Solutions</Link>
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="hero-section">
        <div className="hero-bg-pattern"></div>
        <div className="container hero-content">
          <div className="hero-badge">Smart City Management</div>
          <h1 className="hero-title">
            Modernizing Municipal<br/>
            <span className="text-highlight">Workforce Operations</span>
          </h1>
          <p className="hero-subtitle">
            A secure, transparent, and efficient platform to manage city departments, track geo-fenced attendance, and recruit top civic talent.
          </p>
          <div className="hero-cta-group">
            <Link to="/signup" className="btn-primary large">Create Free Account</Link>
            <Link to="/login" className="btn-secondary large">Login to Dashboard</Link>
          </div>
        </div>
      </section>

      {/* --- Key Metrics (Static for Performance) --- */}
      <section className="metrics-section">
        <div className="container metrics-grid">
          <div className="metric-card">
            <div className="metric-value">12,480+</div>
            <div className="metric-label">Active Municipal Workers</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">98.4%</div>
            <div className="metric-label">Verified Attendance Rate</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">100%</div>
            <div className="metric-label">Audit-Proof Records</div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="features-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Everything you need to run the city</h2>
            <p className="section-description">Built for government transparency and administrative efficiency.</p>
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
              <p>Get a bird's-eye view of all departments, approve leave requests, and manage workforce distribution from one dashboard.</p>
            </Link>

            <Link to="/platform" className="feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="feature-icon">🤖</div>
              <h3>Smart Recruitment</h3>
              <p>Automated skill matching and unbiased candidate ranking to ensure the city hires the best possible talent.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="landing-footer">
        <div className="container footer-container">
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/compliance">Government Compliance</Link>
            <Link to="/contact">Contact Support</Link>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2026 Nagar Yukt Municipal Systems. Built for Public Trust.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;