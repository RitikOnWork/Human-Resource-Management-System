import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CircleDollarSign, LineChart, Search, Clock, ShieldCheck } from 'lucide-react';
import './landing.css';

const Platform = () => {
  return (
    <>
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
              <div className="feature-icon"><Zap size={36} color="#a78bfa" /></div>
              <h3>Core HR & Automation</h3>
              <p>Automate onboarding, policy rollouts, and multi-tier approval workflows seamlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><CircleDollarSign size={36} color="#a78bfa" /></div>
              <h3>Intelligent Payroll</h3>
              <p>Error-free payroll synced directly with attendance, tax deductions, and compliance rules.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><LineChart size={36} color="#a78bfa" /></div>
              <h3>Performance Management</h3>
              <p>Continuous feedback, 360° reviews, and KPI tracking linked directly to business goals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Search size={36} color="#a78bfa" /></div>
              <h3>Talent Acquisition</h3>
              <p>AI-driven candidate matching and centralized interviewing pipelines.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Clock size={36} color="#a78bfa" /></div>
              <h3>Geo-Fenced Time Tracking</h3>
              <p>Real-time location verified attendance to prevent buddy-punching.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={36} color="#a78bfa" /></div>
              <h3>Enterprise Security</h3>
              <p>Bank-grade encryption, Role-based Access Control, and comprehensive audit logs.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
export default Platform;
