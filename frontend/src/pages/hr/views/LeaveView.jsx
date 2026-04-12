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
    <div className="section-content leave-management">
      <div className="admin-header">
        <h2 className="admin-title">Leave Administration</h2>
        
        <div className="leave-toolbar">
          <div className="search-wrapper-premium">
            <span className="search-icon-mini">{icons.search}</span>
            <input 
              type="text" 
              placeholder="Filter by name or type..." 
              className="search-input-modern"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="toolbar-controls">
            <select className="premium-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Every Request</option>
              <option value="pending">⏳ Pending Review</option>
              <option value="approved">✅ Approved</option>
              <option value="rejected">❌ Rejected</option>
            </select>
            
            <select className="premium-select" value={dateSort} onChange={(e) => setDateSort(e.target.value)}>
              <option value="closest">Timeline: Proximal</option>
              <option value="newest">Timeline: Historical</option>
            </select>
          </div>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">{icons.check}</div>
          <h3>Queue is Clear</h3>
          <p>No leave requests match your current filters.</p>
        </div>
      ) : (
        <div className="leave-modern-grid">
          {filteredRequests.map(req => {
            const isExpanded = expandedId === req.id;
            const arrivalDate = new Date(req.endDate);
            arrivalDate.setDate(arrivalDate.getDate() + 1);

            return (
              <div 
                key={req.id} 
                className={`leave-card-premium ${isExpanded ? 'active-expansion' : ''} ${req.status}`} 
                onClick={() => toggleExpand(req.id)}
              >
                <div className="leave-card-top">
                  <div className="leave-identity">
                    <div className="leave-avatar-hex">{req.employeeName.charAt(0)}</div>
                    <div className="leave-info-bundle">
                      <h4 className="employee-display-name">{req.employeeName}</h4>
                      <span className="leave-category">{req.leaveType}</span>
                    </div>
                  </div>
                  
                  <div className="leave-status-context">
                    <span className={`status-pill ${req.status}`}>{req.status}</span>
                    <button className="expand-trigger">{isExpanded ? icons.chevronUp : icons.chevronDown}</button>
                  </div>
                </div>

                <div className={`leave-expansion-content ${isExpanded ? 'visible' : ''}`}>
                  <div className="leave-details-matrix">
                    <div className="matrix-item">
                      <span className="matrix-label">Duration</span>
                      <div className="matrix-value">{req.startDate} — {req.endDate}</div>
                      <div className="matrix-sub">{req.days} Business Days</div>
                    </div>
                    
                    <div className="matrix-item">
                      <span className="matrix-label">Resumption</span>
                      <div className="matrix-value">{arrivalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="matrix-sub">First day back</div>
                    </div>

                    <div className="matrix-item">
                      <span className="matrix-label">Balance</span>
                      <div className="matrix-value">{req.historicalLeaves || 0} Records</div>
                      <div className="matrix-sub">Approved this year</div>
                    </div>
                  </div>

                  {req.status === 'pending' && (
                    <div className="leave-decision-row">
                      <button 
                        className="btn-action-premium approve" 
                        onClick={(e) => { e.stopPropagation(); handleLeaveAction(req.id, 'approved'); }}
                      >
                        {icons.check} Authorize Request
                      </button>
                      <button 
                        className="btn-action-premium reject" 
                        onClick={(e) => { e.stopPropagation(); handleLeaveAction(req.id, 'rejected'); }}
                      >
                        {icons.x} Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaveView;