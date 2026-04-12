import React, { useState } from 'react';
import { icons } from '../hr/views/Icons';

const PayrollView = () => {
    const [baseSalary, setBaseSalary] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculatePayroll = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/employee/payroll/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    baseSalary: parseFloat(baseSalary), 
                    taxRate: parseFloat(taxRate) 
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to calculate payroll');
            }
            
            if (data.status === 'error') {
                throw new Error(data.message || 'Engine computation error');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="emp-dashboard-container" style={{ animation: 'fadeIn 0.4s ease' }}>
            <h2 className="candidate-page-title" style={{ marginBottom: '0.5rem' }}>Enterprise Payroll Engine</h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                Powered by Java HotSpot™ High-Precision Compute
            </p>

            <div className="candidate-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Input Card */}
                <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', marginBottom: '1.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>
                        Compute Salary
                    </h3>
                    <form onSubmit={calculatePayroll} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Base Salary (₹)</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 85000" 
                                className="candidate-input"
                                style={{ width: '100%', boxSizing: 'border-box' }}
                                value={baseSalary} 
                                onChange={(e) => setBaseSalary(e.target.value)}
                                required 
                                min="1000"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tax Rate (%)</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 15" 
                                className="candidate-input"
                                style={{ width: '100%', boxSizing: 'border-box' }}
                                value={taxRate} 
                                onChange={(e) => setTaxRate(e.target.value)}
                                required 
                                min="0" 
                                max="50"
                            />
                        </div>
                        <button type="submit" className="apply-btn" disabled={loading} style={{ marginTop: '0.5rem', background: '#a78bfa' }}>
                            {loading ? 'Processing on JVM...' : 'Calculate Now'}
                        </button>
                    </form>
                    {error && <div style={{ color: '#ef4444', marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
                </div>

                {/* Output Card */}
                <div className="candidate-card" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '1.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Calculation Results
                    </h3>
                    
                    {!result && !loading && (
                        <div style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.05)' }}>
                            Submit calculation parameters to see the high-precision breakdown here.
                        </div>
                    )}

                    {loading && (
                        <div style={{ color: '#a78bfa', textAlign: 'center', padding: '2rem 0' }}>
                            <div className="spinner" style={{ margin: '0 auto 15px' }}></div>
                            Handshaking with Java Engine...
                        </div>
                    )}

                    {result && (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>Compute Engine</span>
                                <span style={{ color: '#22d3ee', fontWeight: 'bold', fontSize: '0.85rem' }}>{result.engine}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8' }}>Base Salary</span>
                                <span style={{ color: '#fff', fontWeight: 'bold' }}>₹{result.baseSalary.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8' }}>House Rent Allowance (HRA) <span style={{fontSize: '0.75rem', color: '#6366f1'}}>+40%</span></span>
                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>+ ₹{result.hra.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8' }}>Provident Fund (PF) <span style={{fontSize: '0.75rem', color: '#ef4444'}}>-12%</span></span>
                                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>- ₹{result.pf.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8' }}>Tax Applied</span>
                                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>- ₹{result.taxApplied.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(99,102,241,0.1))', padding: '20px', borderRadius: '12px', border: '1px solid rgba(167,139,250,0.3)', textAlign: 'center' }}>
                                <div style={{ color: '#a78bfa', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>Net Take-Home Salary</div>
                                <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '900', textShadow: '0 0 15px rgba(167,139,250,0.4)' }}>
                                    ₹{result.netSalary.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PayrollView;
