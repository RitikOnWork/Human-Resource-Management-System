import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../pages/landing.css';

const PublicLayout = () => {
  return (
    <div className="landing-page">
      {/* Navigation Header */}
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

      {/* Main Content Area */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
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

export default PublicLayout;
