import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Stethoscope, Factory, Laptop, Landmark, ShoppingCart } from 'lucide-react';
import './landing.css';

const Solutions = () => {
  return (
    <>
      <section className="hero-section dark-premium" style={{ padding: '100px 0 60px 0', borderBottom: 'none' }}>
        <div className="hero-background">
          <div className="glow-blue"></div>
          <div className="grid-pattern-overlay"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 className="hero-title modern">Tailored <span className="text-gradient">Solutions</span></h1>
          <p className="hero-subtitle modern" style={{ margin: '0 auto 40px auto' }}>
            Purpose-built configurations mapping exactly to how your industry operates.
          </p>
        </div>
      </section>

      <section className="features-section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Building2 size={36} color="#a78bfa" /></div>
              <h3>For Enterprises</h3>
              <p>Handle multi-national compliance, extreme scale, and intricate multi-tier management reporting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Stethoscope size={36} color="#a78bfa" /></div>
              <h3>For Healthcare</h3>
              <p>Shift-roster management, credential tracking, and rapid backfilling for dynamic clinic environments.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Factory size={36} color="#a78bfa" /></div>
              <h3>For Manufacturing</h3>
              <p>Biometric and geo-fenced attendance, hazardous duty pay calculations, and safety compliance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Laptop size={36} color="#a78bfa" /></div>
              <h3>For Technology</h3>
              <p>Global remote-team syncing, async-performance reviews, and automated contract generation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Landmark size={36} color="#a78bfa" /></div>
              <h3>For Public Sector</h3>
              <p>Transparency-first auditing, rigid promotional schedules, and public portal integrations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShoppingCart size={36} color="#a78bfa" /></div>
              <h3>For Retail</h3>
              <p>Multi-location staffing, seasonal hiring surges, and hourly payroll processing.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
export default Solutions;
