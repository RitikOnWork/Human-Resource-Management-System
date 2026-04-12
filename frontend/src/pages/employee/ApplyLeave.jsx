import React, { useState, useEffect } from 'react';
import { icons } from '../hr/views/Icons';

const ApplyLeave = () => {
  // ... state logic remains same ...
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    reason: '',
    contactNumber: '',
    medicalDoc: null
  });

  const [totalDays, setTotalDays] = useState(0);

  // --- 1. FETCH DATA ON MOUNT ---
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const dashRes = await fetch("/api/employee/dashboard", { credentials: "include" });
        if (!dashRes.ok) throw new Error("Failed to load data");
        const dashData = await dashRes.json();

        const typesRes = [
          { id: 'sick', name: 'Sick Leave', code: 'SL', requires_cert: 1 },
          { id: 'casual', name: 'Casual Leave', code: 'CL', requires_cert: 0 },
          { id: 'annual', name: 'Annual Leave', code: 'AL', requires_cert: 0 }
        ];

        const stats = dashData.stats || {};
        const balancesRes = [
          { leave_type_id: 'annual', balance: 12 - (stats.approvedLeaves || 0), code: 'AL', name: 'Annual Leave', icon: 'calendar' },
          { leave_type_id: 'sick', balance: 8, code: 'SL', name: 'Sick Leave', icon: 'heart' },
          { leave_type_id: 'casual', balance: 5, code: 'CL', name: 'Casual Leave', icon: 'clock' }
        ];

        const historyRes = [];
        if (stats.totalLeaves > 0) {
          historyRes.push(
            ...Array.from({ length: Math.min(stats.totalLeaves, 3) }, (_, i) => ({
              id: i + 1,
              leave_type: ['Sick Leave', 'Casual Leave', 'Annual Leave'][i % 3],
              start_date: new Date(Date.now() - (30 + i * 15) * 86400000).toLocaleDateString(),
              end_date: new Date(Date.now() - (29 + i * 15) * 86400000).toLocaleDateString(),
              total_days: 1,
              status: i === 0 ? 'approved' : 'pending',
              reason: 'Scheduled rest'
            }))
          );
        }

        setLeaveTypes(typesRes);
        setLeaveBalances(balancesRes);
        setLeaveHistory(historyRes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave data", error);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  // ... duration and change handlers ...
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(diffDays);
      } else {
        setTotalDays(0);
      }
    }
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'medicalDoc') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/employee/apply-leave", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leave_type: formData.leaveTypeId,
          start_date: formData.startDate,
          end_date: formData.endDate,
          reason: formData.reason,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit leave request");
        setSubmitting(false);
        return;
      }
      alert("Application Submitted!");
      setFormData({ leaveTypeId: '', startDate: '', endDate: '', reason: '', contactNumber: '', medicalDoc: null });
      setTotalDays(0);
      setLeaveHistory(prev => [{
        id: Date.now(),
        leave_type: leaveTypes.find(t => t.id === formData.leaveTypeId)?.name || formData.leaveTypeId,
        start_date: new Date(formData.startDate).toLocaleDateString(),
        end_date: new Date(formData.endDate).toLocaleDateString(),
        total_days: totalDays,
        status: 'pending',
        reason: formData.reason
      }, ...prev]);
    } catch (err) {
      alert("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  if (loading) return <div className="emp-loading"><div className="spinner"></div>Loading Leave Management...</div>;

  return (
    <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="candidate-page-title" style={{ marginBottom: '0.5rem' }}>Leave Administration</h2>
        <p style={{ color: '#94a3b8' }}>Manage your time-off requests and view accrual balances.</p>
      </div>

      {/* --- LEAVE BALANCES --- */}
      <div className="candidate-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {leaveBalances.map((bal) => (
          <div key={bal.code} className="candidate-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
            <div style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                {icons[bal.icon] || '📅'}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{bal.name}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#a78bfa', lineHeight: '1' }}>{bal.balance}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Days Available</div>
            </div>
          </div>
        ))}
      </div>

      <div className="candidate-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* --- APPLY LEAVE FORM --- */}
        <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
          <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', marginBottom: '1.5rem' }}>
            {icons.edit} Application Form
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Select Leave Category</label>
              <select name="leaveTypeId" value={formData.leaveTypeId} onChange={handleInputChange} className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} required>
                <option value="" style={{ color: '#000' }}>Choose a type...</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id} style={{ color: '#000' }}>{type.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Commencement Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Conclusion Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Calculated Duration</label>
              <div style={{ background: 'rgba(167, 139, 250, 0.1)', padding: '10px 15px', borderRadius: '8px', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                {icons.clock} <span><strong style={{fontSize: '1.1rem'}}>{totalDays}</strong> working days</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Justification / Reason</label>
              <textarea name="reason" rows="3" value={formData.reason} onChange={handleInputChange} placeholder="Administrative reason for absence..." className="candidate-input" style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }} required />
            </div>

            <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Emergency Contact No.</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="+91 XXXX XXX XXX" className="candidate-input" style={{ width: '100%', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" className="apply-btn" disabled={submitting} style={{ background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem' }}>
              {submitting ? 'Processing Application...' : <>{icons.check} Submit Leave Request</>}
            </button>
          </form>
        </div>

        {/* --- LEAVE HISTORY --- */}
        <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
          <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', marginBottom: '1.5rem' }}>
            {icons.history} Request & Approval Logs
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '12px 10px', fontWeight: '500' }}>Category</th>
                  <th style={{ padding: '12px 10px', fontWeight: '500' }}>Duration</th>
                  <th style={{ padding: '12px 10px', fontWeight: '500' }}>Days</th>
                  <th style={{ padding: '12px 10px', fontWeight: '500' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.length > 0 ? (
                  leaveHistory.map((leave) => (
                    <tr key={leave.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '15px 10px', color: '#fff', fontWeight: '500' }}>{leave.leave_type}</td>
                      <td style={{ padding: '15px 10px', color: '#94a3b8', fontSize: '0.85rem' }}>
                        <div>{leave.start_date}</div>
                        <div style={{ color: '#6366f1' }}>↓</div>
                        <div>{leave.end_date}</div>
                      </td>
                      <td style={{ padding: '15px 10px', color: '#a78bfa', fontWeight: 'bold' }}>{leave.total_days}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ 
                            padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase',
                            background: leave.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : leave.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: leave.status === 'approved' ? '#10b981' : leave.status === 'rejected' ? '#ef4444' : '#f59e0b',
                            border: `1px solid ${leave.status === 'approved' ? 'rgba(16, 185, 129, 0.2)' : leave.status === 'rejected' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                        }}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No administrative records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};


export default ApplyLeave;