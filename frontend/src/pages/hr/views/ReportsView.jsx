import React, { useState } from 'react';
import './ReportsView.css';

const ReportsView = () => {
  const [department, setDepartment] = useState('Engineering');
  const [loadingJava, setLoadingJava] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  const runComplianceAudit = async () => {
    setLoadingJava(true);
    setReportResult(null);
    try {
      const resp = await fetch('/api/hr/java-tools/compliance-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ department })
      });
      const data = await resp.json();
      setReportResult(data);
    } catch (err) {
      alert("Failed to connect to Java Reporting Engine");
    } finally {
      setLoadingJava(false);
    }
  };

  return (
    <div className="section-content">
      <div className="section-header reports-header">
        <h2>Enterprise Reporting & Compliance</h2>
        <p style={{ color: '#6b7280' }}>Powered by Java HotSpot™ Big Data Compilation</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="reports-stat-card" style={{ padding: '2rem' }}>
          <h3>Execute Department Audit</h3>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '1rem 0' }}>Select a department to run a deep scan against all fiscal and HR compliance records spanning the last 10 years.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', flex: 1 }}>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing">Marketing</option>
            </select>
            <button onClick={runComplianceAudit} disabled={loadingJava} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loadingJava ? 'Scanning via JVM...' : 'Run Java Audit'}
            </button>
          </div>
        </div>

        {reportResult && (
          <div className="reports-stat-card" style={{ padding: '2rem', borderLeft: reportResult.auditStatus === 'CLEARED' ? '5px solid #10b981' : '5px solid #f59e0b', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '10px' }}>
              <strong>Report ID:</strong> <span style={{ color: '#2563eb' }}>{reportResult.reportId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <strong>Records Processed:</strong> <span>{reportResult.recordsScanned?.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <strong>Compliance Score:</strong> 
              <span style={{ fontWeight: 'bold', color: reportResult.auditStatus === 'CLEARED' ? '#10b981' : '#f59e0b' }}>
                {reportResult.complianceScore}%
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <strong>Status:</strong> 
              <span style={{ background: reportResult.auditStatus === 'CLEARED' ? '#d1fae5' : '#fef3c7', color: reportResult.auditStatus === 'CLEARED' ? '#065f46' : '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {reportResult.auditStatus}
              </span>
            </div>
            <div style={{ marginTop: '20px', background: '#f3f4f6', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '5px' }}>Tax Liability Audited</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                    ${reportResult.totalGrossTaxDisbursed?.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsView;
