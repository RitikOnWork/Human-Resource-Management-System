import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './landing.css'; // Reusing your beautiful new styles!

function PublicInfo() {
  const location = useLocation();
  const path = location.pathname.replace('/', ''); // gets 'privacy', 'platform', etc.

  // The text for all your different pages
  const content = {
    platform: { 
      title: "The Platform", 
      text: "Nagar Yukt HRMS is a comprehensive suite designed specifically for municipal bodies. It integrates attendance, payroll, and recruitment into one unified ecosystem." 
    },
    solutions: { 
      title: "Our Solutions", 
      text: "Whether you manage sanitation workers, administrative staff, or health inspectors, our geo-fenced solutions ensure accountability across all municipal departments." 
    },
    privacy: { 
      title: "Privacy Policy", 
      text: "We take your data security seriously. All employee records and geo-location data are encrypted and strictly accessible only by authorized HR administrators." 
    },
    compliance: { 
      title: "Government Compliance", 
      text: "Our platform is built to adhere strictly to State and Federal data protection guidelines for government employees and contractors." 
    },
    contact: { 
      title: "Contact Support", 
      text: "Need help? Reach out to our 24/7 municipal support team at support@nagaryukt.gov or call 1-800-NAGAR-HELP." 
    }
  };

  const pageData = content[path] || { title: "Coming Soon", text: "We are currently updating this section." };

  return (
    <div className="landing-page">
      {/* Simple Header */}
      <header className="landing-header">
         <div className="container header-container">
            <Link to="/" className="brand" style={{textDecoration: 'none'}}>
              <div className="brand-logo">NY</div>
              <span className="brand-text">Nagar Yukt HRMS</span>
            </Link>
         </div>
      </header>

      {/* Dynamic Content */}
      <div className="container" style={{ padding: '100px 24px', minHeight: '65vh' }}>
        <h1 style={{ fontSize: '3rem', color: '#111827', marginBottom: '20px' }}>{pageData.title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', maxWidth: '800px' }}>{pageData.text}</p>
        
        <Link to="/" style={{ display: 'inline-block', marginTop: '40px', color: '#ea580c', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
          ← Back to Home
        </Link>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container footer-container">
          <div className="footer-copyright">
            <p>&copy; 2026 Nagar Yukt Municipal Systems. Built for Public Trust.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicInfo;