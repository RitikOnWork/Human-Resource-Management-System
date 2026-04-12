import React, { useState } from 'react';
import { icons } from '../hr/views/Icons';

const SettingsView = ({ data }) => {
    const [notifications, setNotifications] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [theme, setTheme] = useState('oled');

    const handleSavePassword = (e) => {
        e.preventDefault();
        alert('Security credentials updated successfully.');
    };

    return (
        <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 className="candidate-page-title" style={{ marginBottom: '0.5rem' }}>Account Settings</h2>
                <p style={{ color: '#94a3b8' }}>Manage your configuration, security, and personal preferences.</p>
            </div>

            <div className="candidate-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)', gap: '2rem' }}>
                
                {/* Left Column - Preferences & Toggles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#fff' }}>
                            Preferences
                        </h3>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <strong style={{ color: '#fff', display: 'block' }}>Push Notifications</strong>
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Receive alerts for new messages.</span>
                            </div>
                            <button 
                                onClick={() => setNotifications(!notifications)}
                                style={{ 
                                    width: '50px', height: '26px', borderRadius: '13px', border: 'none', cursor: 'pointer',
                                    background: notifications ? '#10b981' : 'rgba(255,255,255,0.1)',
                                    position: 'relative', transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ 
                                    width: '22px', height: '22px', borderRadius: '50%', background: '#fff',
                                    position: 'absolute', top: '2px', left: notifications ? '26px' : '2px', transition: 'all 0.3s'
                                }}/>
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ color: '#fff', display: 'block' }}>Two-Factor Auth (2FA)</strong>
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Secure your account with an OTP.</span>
                            </div>
                            <button 
                                onClick={() => setTwoFactor(!twoFactor)}
                                style={{ 
                                    width: '50px', height: '26px', borderRadius: '13px', border: 'none', cursor: 'pointer',
                                    background: twoFactor ? '#a78bfa' : 'rgba(255,255,255,0.1)',
                                    position: 'relative', transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ 
                                    width: '22px', height: '22px', borderRadius: '50%', background: '#fff',
                                    position: 'absolute', top: '2px', left: twoFactor ? '26px' : '2px', transition: 'all 0.3s'
                                }}/>
                            </button>
                        </div>
                    </div>

                    <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#fff' }}>
                            Theme & Appearance
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button 
                                onClick={() => setTheme('oled')}
                                style={{ 
                                    background: theme === 'oled' ? 'rgba(167, 139, 250, 0.15)' : 'rgba(255,255,255,0.05)', 
                                    border: theme === 'oled' ? '1px solid #a78bfa' : '1px solid transparent',
                                    padding: '1rem', borderRadius: '12px', color: '#fff', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ marginBottom: '8px', fontSize: '1.5rem' }}>🌙</div>
                                <strong>OLED Dark</strong>
                            </button>
                            <button 
                                onClick={() => setTheme('light')}
                                style={{ 
                                    background: theme === 'light' ? 'rgba(167, 139, 250, 0.15)' : 'rgba(255,255,255,0.05)', 
                                    border: theme === 'light' ? '1px solid #a78bfa' : '1px solid transparent',
                                    padding: '1rem', borderRadius: '12px', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ marginBottom: '8px', fontSize: '1.5rem' }}>☀️</div>
                                <strong>Light Mode</strong>
                                <div style={{ fontSize: '0.7rem', marginTop: '4px', color: '#ef4444' }}>Not Recommended</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Security Forms */}
                <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        Security Management
                    </h3>
                    
                    <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Current Password</label>
                            <input type="password" placeholder="••••••••••••" className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} required />
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>New Password</label>
                            <input type="password" placeholder="Enter new highly secure password" className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} required />
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Confirm New Password</label>
                            <input type="password" placeholder="Re-enter password" className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} required />
                        </div>

                        <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                            <strong style={{ color: '#f59e0b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                ⚠️ Session Warning
                            </strong>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '8px 0 0 0', lineHeight: '1.5' }}>
                                Changing your password will immediately sign you out of all active devices, including this current session. You will need to log back in immediately.
                            </p>
                        </div>

                        <button type="submit" className="apply-btn" style={{ background: '#a78bfa', marginTop: '0.5rem' }}>Update Security Token</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
