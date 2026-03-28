import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const NotFound = () => {
  return (
    <div className="landing-page dark-premium" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="hero-title modern" style={{ fontSize: '6rem', marginBottom: '10px' }}>404</h1>
      <h2 className="hero-subtitle modern" style={{ fontSize: '2rem', color: '#f9fafb' }}>Page Not Found</h2>
      <p style={{ color: '#9ca3af', marginBottom: '30px', fontSize: '1.2rem' }}>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-modern-primary">Return Home</Link>
    </div>
  );
};

export default NotFound;
