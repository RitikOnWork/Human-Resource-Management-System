// src/pages/hr/views/LeaveView.jsx
import React, { useState } from 'react';
import { icons } from './Icons';

const LeaveView = ({ leaveRequests, handleLeaveAction }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateSort, setDateSort] = useState('closest'); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [batchResult, setBatchResult] = useState(null);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);
  
  const runJavaBatchProcessor = async () => {
    setLoadingBatch(true);
    try {
        const resp = await fetch('/api/hr/java-tools/leave-batch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ balance: 15, tenure: 6 }) // Example param for demo purposes
        });
        const data = await resp.json();
        setBatchResult(data);
    } catch(err) {
        alert("Failed to connect to JVM");
    } finally {
        setLoadingBatch(false);
    }
  };

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

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>🚀 Year-End Rollover Batch</h3>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '15px' }}>Trigger the JVM to securely calculate carry-over parameters, forfeit expirations, and process loyalty tenure bonuses across the entire organization.</p>
        <button 
           onClick={runJavaBatchProcessor} 
           disabled={loadingBatch}
           style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
           {loadingBatch ? 'Initiating JVM Processor...' : 'Run Enterprise Rollover Calculation'}
        </button>

        {batchResult && (
            <div style={{ marginTop: '15px', background: '#f9fafb', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #7c3aed', animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <strong style={{color: '#374151'}}>Input Variables Analyzed (Demo):</strong> <span style={{color: '#6b7280'}}>15 Days Balance, 6 Years Tenure</span>
                </div>
                <hr style={{border: 'none', borderBottom: '1px solid #e5e7eb', margin: '10px 0'}}/>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                    <div>
                        <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Rolled Over</div>
                        <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981'}}>{batchResult.rolledOverDays}</div>
                    </div>
                    <div>
                        <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Forfeited</div>
                        <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#ef4444'}}>{batchResult.forfeitedDays}</div>
                    </div>
                    <div>
                        <div style={{fontSize: '0.8rem', color: '#6b7280'}}>Loyalty Grant</div>
                        <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#3b82f6'}}>+{batchResult.loyaltyBonusDays}</div>
                    </div>
                    <div>
                        <div style={{fontSize: '0.8rem', color: '#6b7280'}}>New Balance</div>
                        <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#7c3aed'}}>{batchResult.newTotalBalance}</div>
                    </div>
                </div>
            </div>
        )}
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