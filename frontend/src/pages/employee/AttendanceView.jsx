import React, { useState } from 'react';

const AttendanceView = ({ data }) => {
    // Utility for calendar generation
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Dummy attendance logic for visual generation based on current date
    const getDayStatus = (day) => {
        const today = new Date();
        if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())) return 'future'; 
        if (year === today.getFullYear() && month === today.getMonth() && day > today.getDate()) return 'future';
        
        if (day % 7 === 0 || day % 7 === 6) return 'weekend'; 
        
        const random = Math.random();
        if (random > 0.9) return 'absent';
        if (random > 0.8) return 'late';
        if (random > 0.75) return 'half-day';
        return 'present';
    };

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <div className="emp-header">
                <div>
                    <h1>Attendance Tracker</h1>
                    <p className="emp-subtitle">Monitor your daily working hours and attendance logs.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <button className="emp-action-link" style={{ width: 'auto', background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }} onClick={() => alert('Jio-Hazari Clock In Initiated!')}>
                        ⏱ Clock In
                    </button>
                    <button className="emp-action-link" style={{ width: 'auto', background: 'var(--accent-purple)', color: 'white' }} onClick={() => alert('Jio-Hazari Clock Out Initiated!')}>
                        Clock Out
                    </button>
                </div>
            </div>

            <div className="emp-main-layout">
                {/* Calendar View */}
                <div className="emp-card">
                    {/* Calendar Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={prevMonth} style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple)', fontSize: '1.75rem', cursor: 'pointer', padding: '0 10px', fontWeight: '800' }}>&lsaquo;</button>
                        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{monthNames[month]} {year}</h3>
                        <button onClick={nextMonth} style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple)', fontSize: '1.75rem', cursor: 'pointer', padding: '0 10px', fontWeight: '800' }}>&rsaquo;</button>
                    </div>

                    {/* Calendar Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', textAlign: 'center' }}>
                        {/* Day Names */}
                        {dayNames.map(d => (
                            <div key={d} style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', paddingBottom: '12px' }}>{d}</div>
                        ))}
                        
                        {/* Blanks for First Day Offset */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} style={{ padding: '15px' }}></div>
                        ))}

                        {/* Actual Days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const status = getDayStatus(day);
                            
                            let bgColor = '#f8fafc';
                            let color = 'var(--text-primary)';
                            let border = '1px solid var(--border-glass)';

                            if (status === 'present') { bgColor = '#f0fdf4'; color = '#16a34a'; border = '1px solid #bcf0da'; }
                            if (status === 'absent') { bgColor = '#fef2f2'; color = '#dc2626'; border = '1px solid #fecaca'; }
                            if (status === 'late') { bgColor = '#fffbeb'; color = '#d97706'; border = '1px solid #fef3c7'; }
                            if (status === 'half-day') { bgColor = '#f5f3ff'; color = '#7c3aed'; border = '1px solid #ddd6fe'; }
                            if (status === 'future') { color = '#cbd5e1'; border = '1px dashed #e2e8f0'; }

                            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                            if (isToday) { border = '2px solid var(--accent-purple)'; }

                            return (
                                <div key={day} style={{ 
                                    background: bgColor, color, border, 
                                    padding: '14px 5px', borderRadius: '12px', 
                                    fontSize: '1rem', fontWeight: isToday ? '800' : '600',
                                    transition: 'all 0.3s ease', cursor: 'pointer'
                                }} className="calendar-day-hover">
                                    {day}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '20px', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#16a34a' }}></span> Present</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#dc2626' }}></span> Absent</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#d97706' }}></span> Late</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#7c3aed' }}></span> Half-Day</div>
                    </div>
                </div>

                {/* Right Side - Logs & Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="emp-card">
                        <h3>Monthly Summary</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.5rem' }}>
                            <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '16px', border: '1px solid #bcf0da' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#16a34a', letterSpacing: '-1px' }}>18</div>
                                <div style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Present</div>
                            </div>
                            <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fecaca' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#dc2626', letterSpacing: '-1px' }}>2</div>
                                <div style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Absent</div>
                            </div>
                            <div style={{ background: '#fffbeb', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fef3c7' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#d97706', letterSpacing: '-1px' }}>4</div>
                                <div style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Late</div>
                            </div>
                            <div style={{ background: '#f5f3ff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#7c3aed', letterSpacing: '-1px' }}>164h</div>
                                <div style={{ color: '#7c3aed', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Total Hours</div>
                            </div>
                        </div>
                    </div>

                    <div className="emp-card" style={{ flex: 1 }}>
                        <h3>Recent Check-ins</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '1.5rem' }}>
                            {[ { day: 'Today', time: '08:52 AM', status: 'Clock In' }, { day: 'Yesterday', time: '09:05 AM', status: 'Clock In' } ].map((log, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: '800', fontSize: '0.95rem' }}>{log.day}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>Office HQ • Jio-Hazari</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: '#16a34a', fontWeight: '800', fontSize: '0.95rem' }}>{log.time}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>{log.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                .calendar-day-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-color: var(--accent-purple) !important; }
            `}} />
        </div>
    );
};

export default AttendanceView;

