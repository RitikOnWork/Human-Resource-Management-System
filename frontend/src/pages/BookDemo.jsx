import { useState } from "react";
import { Link } from "react-router-dom";
import { Hand } from "lucide-react";
import "./auth/login.css"; // Reuse the luxurious dark theme auth CSS

function BookDemo() {
  const [form, setForm] = useState({ name: "", email: "", company: "", size: "1-50", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for booking demo
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-glow"></div>
      <div className="login-grid"></div>

      <Link to="/" className="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      <div className="login-wrapper" style={{ maxWidth: '500px' }}>
        <div className="login-card">
          <div className="login-header">
            <div className="logo-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)' }}>
              <Hand color="#ffffff" size={24} />
            </div>
            <h2>Book a Demo</h2>
            <p>See exactly how our platform fits your organization.</p>
          </div>

          {submitted ? (
            <div className="success-message" style={{ textAlign: 'center', padding: '30px' }}>
              <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>Request Received!</h3>
              <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>
                Thanks for your interest. One of our product specialists will contact you at <strong>{form.email}</strong> shortly to schedule your personalized walkthrough.
              </p>
              <button 
                className="submit-btn" 
                style={{ marginTop: '20px', background: 'transparent', border: '1px solid #3b82f6', color: '#60a5fa' }}
                onClick={() => setSubmitted(false)}
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Clark Kent"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Work Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Daily Planet Corp"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Organization Size</label>
                <select 
                  value={form.size} 
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    color: '#f8fafc',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="1-50" style={{ color: '#000' }}>1 - 50 employees</option>
                  <option value="51-200" style={{ color: '#000' }}>51 - 200 employees</option>
                  <option value="201-1000" style={{ color: '#000' }}>201 - 1,000 employees</option>
                  <option value="1000+" style={{ color: '#000' }}>1,000+ employees</option>
                </select>
              </div>

              <button type="submit" className="submit-btn" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)' }}>
                Request Demo
              </button>
            </form>
          )}

          <div className="login-footer">
            Already registered? <Link to="/login" style={{ color: '#06b6d4' }}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDemo;
