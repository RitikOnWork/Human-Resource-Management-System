import React, { useState } from 'react';
import { icons } from '../hr/views/Icons';

const CandidateProfile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    // In a real app we'd fetch this from backend based on candidate _id
    const [profile, setProfile] = useState({
        name: user?.name || 'Talent Applicant',
        email: user?.email || 'candidate@talent.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, India',
        linkedIn: 'linkedin.com/in/ritik',
        portfolio: 'github.com/ritik',
        experience: '4+ Years',
        bio: 'Dedicated software architect specialized in building high-performance distributed systems and AI ecosystems.',
        skills: ['Cloud Architecture', 'React Performance', 'Node.js', 'JVM Microservices']
    });

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    return (
        <div className="candidate-portal-view" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div className="candidate-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
                <div>
                    <h1 className="candidate-page-title" style={{ marginBottom: '0.5rem' }}>Personal Portfolio</h1>
                    <p className="candidate-portal-subtitle" style={{ marginBottom: 0 }}>Showcase your professional journey and key achievements.</p>
                </div>
                <button 
                    className="apply-btn" 
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ background: isEditing ? '#f1f5f9' : 'var(--accent-purple)', color: isEditing ? '#64748b' : 'white', boxShadow: 'none' }}
                >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
            </div>

            <div className="candidate-grid" style={{ gridTemplateColumns: 'minmax(320px, 1fr) minmax(500px, 2fr)' }}>
                {/* Left Column - Avatar & Quick Info */}
                <div className="candidate-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '130px', height: '130px', borderRadius: '44px', 
                        background: 'var(--grad-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3.5rem', fontWeight: '900', color: '#fff', marginBottom: '1.5rem',
                        boxShadow: '0 15px 35px rgba(99, 102, 241, 0.25)'
                    }}>
                        {profile.name.charAt(0)}
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>{profile.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '2rem' }}>{profile.email}</p>
                    
                    <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem' }}>Profile Completion</span>
                            <span style={{ color: 'var(--accent-purple)', fontWeight: 900, fontSize: '0.85rem' }}>92%</span>
                        </div>
                        <div style={{ background: '#f1f5f9', borderRadius: '12px', height: '10px', overflow: 'hidden' }}>
                            <div style={{ background: 'var(--grad-primary)', width: '92%', height: '100%', borderRadius: '12px' }}></div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details Form */}
                <div className="candidate-card">
                    <h3 style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', marginBottom: '2rem', fontSize: '1.5rem' }}>
                        Professional Information
                    </h3>
                    
                    {isEditing ? (
                        <form onSubmit={handleSave} className="candidate-filters" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', background: 'transparent', padding: 0, border: 'none', boxShadow: 'none' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Full Name</label>
                                    <input type="text" className="candidate-input" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} style={{ width: '100%' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                                    <input type="text" className="candidate-input" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} style={{ width: '100%' }} />
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Current Location</label>
                                    <input type="text" className="candidate-input" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} style={{ width: '100%' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Experience Level</label>
                                    <input type="text" className="candidate-input" value={profile.experience} onChange={e => setProfile({...profile, experience: e.target.value})} style={{ width: '100%' }} />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Professional Bio</label>
                                <textarea className="candidate-input" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} style={{ width: '100%', minHeight: '120px', resize: 'none' }}></textarea>
                            </div>

                            <button type="submit" className="apply-btn" style={{ width: '200px', marginTop: '1rem' }}>Save Portfolio</button>
                        </form>
                    ) : (
                        <div style={{ display: 'grid', gap: '3rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Phone Number</p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{profile.phone}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Location</p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{profile.location}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Professional Exp.</p>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{profile.experience}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Digital Connect</p>
                                    <a href="#" style={{ color: 'var(--accent-purple)', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem' }}>LinkedIn Profile</a>
                                </div>
                            </div>
                            
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                                <p style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Core Bio</p>
                                <p style={{ color: 'var(--text-primary)', lineHeight: '1.7', fontWeight: 500, fontSize: '1.05rem' }}>{profile.bio}</p>
                            </div>

                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>Top Competencies</p>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {profile.skills.map((skill, i) => (
                                        <span key={i} style={{ 
                                            background: 'var(--bg-secondary)', color: 'var(--accent-purple)', 
                                            padding: '10px 20px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: '800',
                                            border: '1px solid var(--border-glass)'
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
