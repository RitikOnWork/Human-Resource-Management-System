import React, { useState, useEffect } from 'react';
import './ApplyLeave.css';

const ApplyLeave = () => {
  // --- STATE MANAGEMENT ---
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
    // Simulating API calls to fetch data derived from DB tables
    const fetchLeaveData = async () => {
      try {
        // API Call 1: Fetch Leave Types (SELECT * FROM leave_types WHERE is_active = 1)
        // 
        const typesRes = [
          { id: 1, name: 'Annual Leave', code: 'AL', requires_cert: 0 },
          { id: 2, name: 'Sick Leave', code: 'SL', requires_cert: 1 },
          { id: 3, name: 'Casual Leave', code: 'CL', requires_cert: 0 },
          { id: 4, name: 'Maternity Leave', code: 'ML', requires_cert: 1 }
        ];

        // API Call 2: Fetch Balances (SELECT * FROM leave_balances WHERE employee_id = ?)
        // 
        const balancesRes = [
          { leave_type_id: 1, balance: 12, code: 'AL', name: 'Annual Leave' },
          { leave_type_id: 2, balance: 8, code: 'SL', name: 'Sick Leave' },
          { leave_type_id: 3, balance: 5, code: 'CL', name: 'Casual Leave' }
        ];

        // API Call 3: Fetch History (SELECT * FROM leave_requests WHERE employee_id = ? ORDER BY created_at DESC)
        // 
        const historyRes = [
          { 
            id: 101, 
            leave_type: 'Sick Leave', 
            start_date: '2026-01-05', 
            end_date: '2026-01-06', 
            total_days: 2, 
            status: 'approved', 
            reason: 'Viral fever' 
          },
          { 
            id: 102, 
            leave_type: 'Casual Leave', 
            start_date: '2026-01-20', 
            end_date: '2026-01-21', 
            total_days: 2, 
            status: 'pending', 
            reason: 'Personal work' 
          }
        ];

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

  // --- 2. CALCULATE DURATION ---
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive of start day
        setTotalDays(diffDays);
      } else {
        setTotalDays(0);
      }
    }
  }, [formData.startDate, formData.endDate]);

  // --- 3. HANDLE INPUT CHANGE ---
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'medicalDoc') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // --- 4. SUBMIT FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare payload matching 'leave_requests' table schema 
    const payload = {
      leave_type_id: formData.leaveTypeId, // Maps to leave_requests.leave_type_id
      start_date: formData.startDate,      // Maps to leave_requests.start_date
      end_date: formData.endDate,          // Maps to leave_requests.end_date
      total_days: totalDays,               // Maps to leave_requests.total_days
      reason: formData.reason,             // Maps to leave_requests.reason
      contact_during_leave: formData.contactNumber, // Maps to leave_requests.contact_during_leave
      // status will default to 'pending' in DB
    };

    console.log("Sending to DB:", payload);

    // Simulate Network Request
    setTimeout(() => {
      alert("Leave Application Submitted Successfully!");
      setSubmitting(false);
      // Reset form
      setFormData({
        leaveTypeId: '',
        startDate: '',
        endDate: '',
        reason: '',
        contactNumber: '',
        medicalDoc: null
      });
      setTotalDays(0);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  if (loading) return <div className="loading-spinner">Loading Leave Data...</div>;

  return (
    <div className="leave-container">
      <h2 className="page-title">Leave Management</h2>

      {/* --- SECTION 1: LEAVE BALANCES  --- */}
      <section className="balance-grid">
        {leaveBalances.map((bal) => (
          <div key={bal.code} className="balance-card">
            <div className="balance-header">{bal.name}</div>
            <div className="balance-count">{bal.balance}</div>
            <div className="balance-sub">Days Available</div>
          </div>
        ))}
      </section>

      <div className="leave-content-layout">
        
        {/* --- SECTION 2: APPLY LEAVE FORM --- */}
        <div className="leave-form-card">
          <h3>Apply for Leave</h3>
          <form onSubmit={handleSubmit}>
            
            {/* Leave Type  */}
            <div className="form-group">
              <label>Leave Type</label>
              <select 
                name="leaveTypeId" 
                value={formData.leaveTypeId} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Select Type</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Dates  */}
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>

            {/* Calculated Days */}
            <div className="form-group">
              <label>Total Days</label>
              <input type="text" value={totalDays} readOnly className="readonly-input" />
            </div>

            {/* Reason [cite: 928] */}
            <div className="form-group">
              <label>Reason for Leave</label>
              <textarea 
                name="reason" 
                rows="3" 
                value={formData.reason} 
                onChange={handleInputChange} 
                placeholder="Briefly explain the reason..." 
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Emergency Contact</label>
              <input 
                type="text" 
                name="contactNumber" 
                value={formData.contactNumber} 
                onChange={handleInputChange} 
                placeholder="Phone number during leave" 
              />
            </div>

            {/* Conditional File Upload if type requires cert [cite: 1292] */}
            {leaveTypes.find(t => t.id === parseInt(formData.leaveTypeId))?.requires_cert === 1 && (
              <div className="form-group">
                <label className="required-label">Medical Certificate (Required)</label>
                <input type="file" name="medicalDoc" onChange={handleInputChange} required />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>

        {/* --- SECTION 3: LEAVE HISTORY  --- */}
        <div className="leave-history-card">
          <h3>Request History</h3>
          <div className="table-responsive">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.length > 0 ? (
                  leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.leave_type}</td>
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
                    <td colSpan="4" className="no-data">No leave history found.</td>
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