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
      text: "HRMS is a comprehensive suite designed for modern organizations. It integrates attendance, payroll, and recruitment into one unified ecosystem." 
    },
    solutions: { 
      title: "Our Solutions", 
      text: "Whether you manage a global team, dynamic shift workers, or remote employees, our geo-fenced solutions ensure accountability across all departments." 
    },
    privacy: { 
      title: "Privacy Policy", 
      text: "We take your data security seriously. All employee records and data are encrypted and strictly accessible only by authorized HR administrators." 
    },
    compliance: { 
      title: "Enterprise Security", 
      text: "Our platform is built to adhere strictly to global data protection guidelines like GDPR and SOC2 for enterprise organizations." 
    },
    contact: { 
      title: "Contact Support", 
      text: "Need help? Reach out to our 24/7 enterprise support team at support@hrms.com or call 1-800-HRMS-HELP." 
    }
  };

  const pageData = content[path] || { title: "Coming Soon", text: "We are currently updating this section." };

  return (
    <>
      {/* Dynamic Content */}
      <div className="container" style={{ padding: '100px 24px', minHeight: '65vh' }}>
        <h1 style={{ fontSize: '3rem', color: '#f9fafb', marginBottom: '20px', letterSpacing: '-0.02em', fontWeight: '800' }}>{pageData.title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af', lineHeight: '1.8', maxWidth: '800px' }}>{pageData.text}</p>
        
        <Link to="/" style={{ display: 'inline-block', marginTop: '40px', color: '#a78bfa', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
          ← Back to Home
        </Link>
      </div>
    </>
  );
}

export default PublicInfo;