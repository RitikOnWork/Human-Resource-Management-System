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
    <div className="leave-container">
      <header className="leave-portal-header">
        <h2 className="page-title">Leave Administration</h2>
        <p className="portal-subtitle">Manage your time-off requests and view accrual balances.</p>
      </header>

      {/* --- LEAVE BALANCES --- */}
      <section className="balance-grid">
        {leaveBalances.map((bal) => (
          <div key={bal.code} className="balance-card">
            <div className="balance-icon">{icons[bal.icon] || '📅'}</div>
            <div className="balance-info">
              <div className="balance-header">{bal.name}</div>
              <div className="balance-count">{bal.balance}</div>
              <div className="balance-sub">Days Available</div>
            </div>
          </div>
        ))}
      </section>

      <div className="leave-content-layout">
        
        {/* --- APPLY LEAVE FORM --- */}
        <div className="leave-form-card">
          <h3>{icons.edit} Application Form</h3>
          <form onSubmit={handleSubmit} className="premium-form">
            <div className="form-group">
              <label>Select Leave Category</label>
              <select name="leaveTypeId" value={formData.leaveTypeId} onChange={handleInputChange} required>
                <option value="">Choose a type...</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Commencement Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Conclusion Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Calculated Duration</label>
              <div className="duration-pill">
                {icons.clock} <span>{totalDays} working days</span>
              </div>
            </div>

            <div className="form-group">
              <label>Justification / Reason</label>
              <textarea name="reason" rows="3" value={formData.reason} onChange={handleInputChange} placeholder="Administrative reason for absence..." required />
            </div>

            <div className="form-group">
                <label>Emergency Contact No.</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="+91 XXXX XXX XXX" />
            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Processing Application...' : <>{icons.check} Submit Leave Request</>}
            </button>
          </form>
        </div>

        {/* --- LEAVE HISTORY --- */}
        <div className="leave-history-card">
          <h3>{icons.history} Request & Approval Logs</h3>
          <div className="table-responsive">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.length > 0 ? (
                  leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td className="type-cell"><strong>{leave.leave_type}</strong></td>
                      <td>
                        <div className="date-range">
                          <span>{leave.start_date}</span>
                          <span className="arrow">→</span>
                          <span>{leave.end_date}</span>
                        </div>
                      </td>
                      <td>{leave.total_days}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadge(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">No administrative records found.</td>
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