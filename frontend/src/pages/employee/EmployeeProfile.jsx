import React, { useState } from 'react';

const EmployeeProfile = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const [profile, setProfile] = useState({
        name: data?.user?.name || 'Employee',
        email: data?.user?.email || 'emp@hrms.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, India',
        department: data?.employee?.department || 'Engineering',
        role: data?.employee?.position || 'Software Engineer',
        bio: 'Dedicated developer passionate about crafting high-performance, scalable enterprise solutions.'
    });

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    return (
        <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div className="emp-header">
                <div>
                    <h1>My Profile</h1>
                    <p className="emp-subtitle">Manage your personal and professional information.</p>
                </div>
                <button 
                    className="emp-action-link" 
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ width: 'auto', padding: '10px 24px', background: isEditing ? 'var(--bg-primary)' : 'var(--accent-purple)', color: isEditing ? 'var(--text-secondary)' : 'white' }}
                >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
            </div>

            <div className="emp-main-layout">
                {/* Left Column - Avatar & Quick Info */}
                <div className="emp-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '40px', 
                        background: 'var(--grad-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3.5rem', fontWeight: '900', color: 'white', marginBottom: '1.5rem',
                        boxShadow: '0 15px 30px rgba(99, 102, 241, 0.2)'
                    }}>
                        {profile.name.charAt(0)}
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{profile.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '2rem' }}>{profile.email}</p>
                    
                    <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Employee ID</span>
                            <span style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.85rem' }}>{data?.employee?.employee_code || 'EMP-772'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Joined On</span>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem' }}>14 Jan 2024</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details Form */}
                <div className="emp-card">
                    <div className="card-header-row">
                        <h3>Personal Information</h3>
                    </div>
                    
                    {isEditing ? (
                        <form onSubmit={handleSave} className="login-form">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
                            </div>
                            
                            <div className="form-group">
                                <label>Professional Bio</label>
                                <textarea 
                                    className="form-group input" 
                                    value={profile.bio} 
                                    onChange={e => setProfile({...profile, bio: e.target.value})} 
                                    style={{ 
                                        width: '100%', padding: '14px 18px', border: '1px solid #e2e8f0', 
                                        borderRadius: '12px', minHeight: '120px', resize: 'none',
                                        backgroundColor: '#f8fafc', color: 'var(--text-primary)',
                                        fontFamily: 'inherit', fontSize: '1rem'
                                    }}
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn" style={{ width: '200px' }}>Save Changes</button>
                        </form>
                    ) : (
                        <div style={{ display: 'grid', gap: '2.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Phone Number</p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>{profile.phone}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Work Location</p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>{profile.location}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Department</p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>{profile.department}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Current Role</p>
                                    <span style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '1rem' }}>{profile.role}</span>
                                </div>
                            </div>
                            
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Professional Bio</p>
                                <p style={{ color: 'var(--text-primary)', lineHeight: '1.7', fontWeight: 500 }}>{profile.bio}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;

