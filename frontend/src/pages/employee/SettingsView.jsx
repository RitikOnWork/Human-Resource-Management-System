import React, { useState } from 'react';

const SettingsView = ({ data }) => {
    const [notifications, setNotifications] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    const handleSavePassword = (e) => {
        e.preventDefault();
    };

    return (
        <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div className="emp-header">
                <div>
                    <h1>Account Settings</h1>
                    <p className="emp-subtitle">Manage your configuration, security, and personal preferences.</p>
                </div>
            </div>

            <div className="emp-main-layout">
                
                {/* Left Column - Preferences & Toggles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    
                    <div className="emp-card">
                        <div className="card-header-row">
                            <h3>Preferences</h3>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem', fontWeight: 700 }}>Push Notifications</strong>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Receive real-time alerts for updates.</span>
                            </div>
                            <button 
                                onClick={() => setNotifications(!notifications)}
                                style={{ 
                                    width: '56px', height: '30px', borderRadius: '30px', border: 'none', cursor: 'pointer',
                                    background: notifications ? 'var(--accent-green)' : '#e2e8f0',
                                    position: 'relative', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    padding: 0
                                }}
                            >
                                <div style={{ 
                                    width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
                                    position: 'absolute', top: '3px', left: notifications ? '29px' : '3px', 
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}/>
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem', fontWeight: 700 }}>Two-Factor Auth (2FA)</strong>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Secure your account with an extra layer.</span>
                            </div>
                            <button 
                                onClick={() => setTwoFactor(!twoFactor)}
                                style={{ 
                                    width: '56px', height: '30px', borderRadius: '30px', border: 'none', cursor: 'pointer',
                                    background: twoFactor ? 'var(--accent-purple)' : '#e2e8f0',
                                    position: 'relative', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    padding: 0
                                }}
                            >
                                <div style={{ 
                                    width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
                                    position: 'absolute', top: '3px', left: twoFactor ? '29px' : '3px', 
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}/>
                            </button>
                        </div>
                    </div>

                    <div className="emp-card">
                        <div className="card-header-row">
                            <h3>Active Sessions</h3>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>💻</div>
                            <div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: '800', fontSize: '0.9rem' }}>Windows Desktop • Chrome</div>
                                <div style={{ color: 'var(--accent-green)', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase' }}>Active Now</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Security Forms */}
                <div className="emp-card">
                    <div className="card-header-row">
                        <h3>Security Management</h3>
                    </div>
                    
                    <form onSubmit={handleSavePassword} className="login-form">
                        <div className="form-group">
                            <label>Current Password</label>
                            <input type="password" placeholder="••••••••••••" required />
                        </div>
                        
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" placeholder="Min 12 characters" required />
                        </div>
                        
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" placeholder="Verification" required />
                        </div>

                        <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1.25rem', borderRadius: '16px', marginTop: '1rem' }}>
                            <strong style={{ color: '#d97706', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                ⚠️ Session Alert
                            </strong>
                            <p style={{ color: '#92400e', fontSize: '0.85rem', margin: '8px 0 0 0', lineHeight: '1.6', fontWeight: 500 }}>
                                Profile security updates will terminate all active tokens. You will need to re-authenticate across all platforms immediately.
                            </p>
                        </div>

                        <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>Update Security Token</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;

