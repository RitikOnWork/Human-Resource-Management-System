import React, { useState } from 'react';
import { icons } from '../hr/views/Icons';

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
        if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())) return 'future'; // Future
        if (year === today.getFullYear() && month === today.getMonth() && day > today.getDate()) return 'future';
        
        // Randomly assign some statuses for demonstration
        if (day % 7 === 0 || day % 7 === 6) return 'weekend'; // Weekends rough approx
        
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="candidate-page-title" style={{ marginBottom: '0.5rem' }}>Attendance Tracker</h2>
                    <p style={{ color: '#94a3b8' }}>Monitor your daily working hours and attendance logs.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="apply-btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }} onClick={() => alert('Jio-Hazari Clock In Initiated!')}>
                        ⏱ Clock In
                    </button>
                    <button className="apply-btn" style={{ background: '#a78bfa', color: '#fff' }} onClick={() => alert('Jio-Hazari Clock Out Initiated!')}>
                        Clock Out
                    </button>
                </div>
            </div>

            <div className="candidate-grid" style={{ gridTemplateColumns: 'minmax(350px, 1fr) minmax(300px, 1fr)' }}>
                {/* Calendar View */}
                <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                    {/* Calendar Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <button onClick={prevMonth} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontSize: '1.5rem', cursor: 'pointer', padding: '0 10px' }}>&lsaquo;</button>
                        <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff' }}>{monthNames[month]} {year}</h3>
                        <button onClick={nextMonth} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontSize: '1.5rem', cursor: 'pointer', padding: '0 10px' }}>&rsaquo;</button>
                    </div>

                    {/* Calendar Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
                        {/* Day Names */}
                        {dayNames.map(d => (
                            <div key={d} style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', paddingBottom: '10px' }}>{d}</div>
                        ))}
                        
                        {/* Blanks for First Day Offset */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} style={{ padding: '15px' }}></div>
                        ))}

                        {/* Actual Days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const status = getDayStatus(day);
                            
                            let bgColor = 'rgba(255,255,255,0.03)';
                            let color = '#fff';
                            let border = '1px solid transparent';

                            if (status === 'present') { bgColor = 'rgba(16, 185, 129, 0.15)'; color = '#10b981'; border = '1px solid rgba(16, 185, 129, 0.3)'; }
                            if (status === 'absent') { bgColor = 'rgba(239, 68, 68, 0.15)'; color = '#ef4444'; border = '1px solid rgba(239, 68, 68, 0.3)'; }
                            if (status === 'late') { bgColor = 'rgba(245, 158, 11, 0.15)'; color = '#f59e0b'; border = '1px solid rgba(245, 158, 11, 0.3)'; }
                            if (status === 'half-day') { bgColor = 'rgba(167, 139, 250, 0.15)'; color = '#a78bfa'; border = '1px solid rgba(167, 139, 250, 0.3)'; }
                            if (status === 'future') { color = '#475569'; }

                            // Highlight Today
                            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                            if (isToday) { border = '1px solid #fff'; }

                            return (
                                <div key={day} style={{ 
                                    background: bgColor, color, border, 
                                    padding: '12px 5px', borderRadius: '8px', 
                                    fontSize: '0.95rem', fontWeight: isToday ? 'bold' : '500',
                                    transition: 'transform 0.2s', cursor: 'pointer'
                                }} className="calendar-day-hover">
                                    {day}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span> Present</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span> Absent</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span> Late</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a78bfa' }}></span> Half-Day</div>
                    </div>
                </div>

                {/* Right Side - Logs & Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1.2rem' }}>Monthly Summary</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>18</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Days Present</div>
                            </div>
                            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>2</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Days Absent</div>
                            </div>
                            <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>4</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Late Arrivals</div>
                            </div>
                            <div style={{ background: 'rgba(167, 139, 250, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a78bfa' }}>164h</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Hours</div>
                            </div>
                        </div>
                    </div>

                    <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)', flex: 1 }}>
                        <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.2rem' }}>Recent Check-ins</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 'bold' }}>Today</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Office HQ • Jio-Hazari WiFi</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>08:52 AM</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Clock In</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 'bold' }}>Yesterday</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Office HQ • Jio-Hazari WiFi</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>09:05 AM</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Clock In</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                .calendar-day-hover:hover { transform: scale(1.1); box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
            `}} />
        </div>
    );
};

export default AttendanceView;
