import React, { useState } from 'react';
import './SettingsView.css';

const SettingsView = () => {
  const [form, setForm] = useState({ orgName: '', startTime: '09:00', endTime: '18:00', leavePolicy: 20 });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved locally! (Backend pending)');
  };

  return (
    <div className="section-content">
      <div className="section-header settings-header">
        <h2>Organization Settings</h2>
      </div>
      <div className="settings-card">
        <form onSubmit={handleSubmit} className="settings-form">
          
          <div className="settings-form-group">
            <label className="settings-label">Organization Name</label>
            <input 
              type="text" 
              value={form.orgName} 
              onChange={e => setForm({...form, orgName: e.target.value})} 
              placeholder="e.g. Acme Corp"
              className="settings-input"
            />
          </div>

          <div className="settings-form-row">
            <div className="settings-form-col">
              <label className="settings-label">Start Time</label>
              <input 
                type="time" 
                value={form.startTime} 
                onChange={e => setForm({...form, startTime: e.target.value})} 
                className="settings-input"
              />
            </div>
            <div className="settings-form-col">
              <label className="settings-label">End Time</label>
              <input 
                type="time" 
                value={form.endTime} 
                onChange={e => setForm({...form, endTime: e.target.value})} 
                className="settings-input"
              />
            </div>
          </div>

          <div className="settings-form-group">
            <label className="settings-label">Leave Policy (Max Days)</label>
            <input 
              type="number" 
              value={form.leavePolicy} 
              onChange={e => setForm({...form, leavePolicy: parseInt(e.target.value)})} 
              className="settings-input"
            />
          </div>

          <button type="submit" className="primary-btn settings-submit-btn">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsView;
