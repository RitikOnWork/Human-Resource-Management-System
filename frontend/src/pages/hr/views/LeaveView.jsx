// src/pages/hr/views/LeaveView.jsx
import React, { useState } from 'react';
import { icons } from './Icons';

const LeaveView = ({ leaveRequests, handleLeaveAction }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateSort, setDateSort] = useState('closest'); 
  const [searchQuery, setSearchQuery] = useState(''); 

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const filteredRequests = leaveRequests
    .filter(req => {
      if (filterStatus !== 'all' && req.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = req.employeeName.toLowerCase().includes(query);
        const matchesType = req.leaveType.toLowerCase().includes(query);
        return matchesName || matchesType;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      if (dateSort === 'closest') {
        const today = new Date();
        return Math.abs(today - dateA) - Math.abs(today - dateB);
      }
      return dateB - dateA;
    });

  return (
    <div className="section-content">
      <div className="section-header">
        <h2>Leave Requests</h2>
        <div className="leave-toolbar" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="search-wrapper" style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
              {icons.search}
            </span>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #e2e8f0', minWidth: '220px' }}
            />
          </div>
          <select className="sort-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="sort-select" value={dateSort} onChange={(e) => setDateSort(e.target.value)}>
            <option value="closest">Closest to Today</option>
            <option value="newest">Further Out</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>✓</div>
          <h3>No records found</h3>
        </div>
      ) : (
        <div className="leave-grid">
          {filteredRequests.map(req => {
            const isExpanded = expandedId === req.id;
            const arrivalDate = new Date(req.endDate);
            arrivalDate.setDate(arrivalDate.getDate() + 1);

            return (
              <div key={req.id} className={`leave-card-expandable ${isExpanded ? 'expanded' : ''} ${req.status}`} onClick={() => toggleExpand(req.id)}>
                <div className="leave-card-header">
                  <div className="leave-user-info">
                    <img src={`https://ui-avatars.com/api/?name=${req.employeeName}&background=random&color=fff`} alt="Profile" className="leave-avatar"/>
                    <div>
                      <h4 className="leave-name">{req.employeeName}</h4>
                      <span className="leave-role">{req.leaveType}</span>
                    </div>
                  </div>
                  <div className="leave-quick-status">
                    <span className={`status-badge-mini ${req.status}`}>{req.status}</span>
                    {!isExpanded && <div className="leave-date-preview">{req.startDate}</div>}
                  </div>
                </div>
                {isExpanded && (
                  <div className="leave-card-body">
                    <div className="leave-details-grid">
                      <div className="detail-box">
                        <label>Period</label>
                        <div className="detail-value">{req.startDate} — {req.endDate}</div>
                        <div className="detail-sub">{req.days} Days</div>
                      </div>
                      <div className="detail-box">
                        <label>Return</label>
                        <div className="detail-value">{arrivalDate.toLocaleDateString()}</div>
                      </div>
                      <div className="detail-box">
                        <label>History</label>
                        <div className="detail-value">{req.historicalLeaves || 0} Leaves</div>
                        <div className="detail-sub">Approved previously</div>
                      </div>
                    </div>
                    {req.status === 'pending' && (
                      <div className="leave-actions-row">
                        <button className="action-btn-large approve" onClick={(e) => { e.stopPropagation(); handleLeaveAction(req.id, 'approved'); }}>{icons.check} Approve</button>
                        <button className="action-btn-large reject" onClick={(e) => { e.stopPropagation(); handleLeaveAction(req.id, 'rejected'); }}>{icons.x} Reject</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaveView;