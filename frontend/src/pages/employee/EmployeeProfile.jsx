import React, { useState } from 'react';
import { icons } from '../hr/views/Icons';

const EmployeeProfile = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const [profile, setProfile] = useState({
        name: data?.user?.name || 'Employee',
        email: data?.user?.email || 'emp@hrms.com',
        phone: '+1 (555) 019-2831',
        location: 'Headquarters',
        department: data?.employee?.department || 'Engineering',
        role: data?.employee?.position || 'Software Engineer',
        bio: 'Dedicated team member striving for excellence in all project deliverables.'
    });

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        alert('Profile saved successfully! Database updated.');
    };

    return (
        <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="candidate-page-title" style={{ marginBottom: 0 }}>Employee Profile</h2>
                <button 
                    className="apply-btn" 
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ background: isEditing ? 'rgba(255,255,255,0.1)' : '#a78bfa', color: '#fff' }}
                >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
            </div>

            <div className="candidate-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 2fr)' }}>
                {/* Left Column - Avatar & Quick Info */}
                <div className="candidate-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem',
                        boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)'
                    }}>
                        {profile.name.charAt(0) || 'E'}
                    </div>
                    <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', color: '#fff' }}>{profile.name}</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{profile.email}</p>
                    
                    <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#94a3b8' }}>Employee ID</span>
                            <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>{data?.employee?.employee_code || 'EMP-001'}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details Form */}
                <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#fff' }}>
                        Personal Information
                    </h3>
                    
                    {isEditing ? (
                        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                                    <input type="text" className="candidate-input" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }}/>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
                                    <input type="text" className="candidate-input" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }}/>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Location</label>
                                    <input type="text" className="candidate-input" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }}/>
                                </div>
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Professional Bio</label>
                                <textarea className="candidate-input" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', minHeight: '100px', resize: 'vertical' }}></textarea>
                            </div>

                            <button type="submit" className="apply-btn" style={{ justifySelf: 'start', marginTop: '1rem', background: '#a78bfa' }}>Save Changes</button>
                        </form>
                    ) : (
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>Phone Number</p>
                                    <p style={{ color: '#fff', fontWeight: '500' }}>{profile.phone}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>Location</p>
                                    <p style={{ color: '#fff', fontWeight: '500' }}>{profile.location}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>Department</p>
                                    <p style={{ color: '#fff', fontWeight: '500' }}>{profile.department}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>Role</p>
                                    <span style={{ color: '#a78bfa', fontWeight: '500' }}>{profile.role}</span>
                                </div>
                            </div>
                            
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>Professional Bio</p>
                                <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>{profile.bio}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
