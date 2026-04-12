import React, { useState } from 'react';
import { icons } from '../hr/views/Icons';

const CandidateProfile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    // In a real app we'd fetch this from backend based on candidate _id
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+1 (555) 019-2831',
        location: 'San Francisco, CA',
        linkedIn: 'linkedin.com/in/talent',
        portfolio: 'github.com/talent',
        experience: '5 Years',
        bio: 'A passionate professional looking to drive impactful change in a dynamic environment.',
        skills: ['JavaScript', 'React', 'Node.js', 'System Architecture']
    });

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Here we would typically API fetch PUT /api/candidate/profile
        alert('Profile saved successfully! Database updated.');
    };

    return (
        <div className="candidate-portal-view" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="candidate-page-title" style={{ marginBottom: 0 }}>Candidate Profile</h2>
                <button 
                    className="apply-btn" 
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ background: isEditing ? 'rgba(255,255,255,0.1)' : 'var(--candidate-accent)' }}
                >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
            </div>

            <div className="candidate-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 2fr)' }}>
                {/* Left Column - Avatar & Quick Info */}
                <div className="candidate-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%', 
                        background: 'linear-gradient(135deg, var(--candidate-accent), #0ea5e9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem',
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)'
                    }}>
                        {profile.name.charAt(0) || 'C'}
                    </div>
                    <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', color: '#fff' }}>{profile.name}</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{profile.email}</p>
                    
                    <div style={{ width: '100%', borderTop: '1px solid var(--candidate-border-glass)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#94a3b8' }}>Profile Strength</span>
                            <span style={{ color: 'var(--candidate-accent)', fontWeight: 'bold' }}>85%</span>
                        </div>
                        <div className="score-bar-bg" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                            <div style={{ background: 'var(--candidate-accent)', width: '85%', height: '100%', borderRadius: '10px' }}></div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details Form */}
                <div className="candidate-card">
                    <h3 style={{ borderBottom: '1px solid var(--candidate-border-glass)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
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
                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Experience</label>
                                    <input type="text" className="candidate-input" value={profile.experience} onChange={e => setProfile({...profile, experience: e.target.value})} style={{ width: '100%', boxSizing: 'border-box' }}/>
                                </div>
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Professional Bio</label>
                                <textarea className="candidate-input" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', minHeight: '100px', resize: 'vertical' }}></textarea>
                            </div>

                            <button type="submit" className="apply-btn" style={{ justifySelf: 'start', marginTop: '1rem' }}>Save Changes</button>
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
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>Experience</p>
                                    <p style={{ color: '#fff', fontWeight: '500' }}>{profile.experience}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>LinkedIn</p>
                                    <a href="#" style={{ color: 'var(--candidate-accent)', textDecoration: 'none', fontWeight: '500' }}>{profile.linkedIn}</a>
                                </div>
                            </div>
                            
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--candidate-border-glass)' }}>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>Professional Bio</p>
                                <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>{profile.bio}</p>
                            </div>

                            <div>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>Top Skills</p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {profile.skills.map((skill, i) => (
                                        <span key={i} style={{ 
                                            background: 'rgba(34, 211, 238, 0.1)', color: 'var(--candidate-accent)', 
                                            padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' 
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;
