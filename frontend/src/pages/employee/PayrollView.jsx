import React, { useState } from 'react';

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
            <div className="emp-header">
                <div>
                    <h1>Enterprise Payroll Engine</h1>
                    <p className="emp-subtitle">Powered by Java HotSpot™ High-Precision Compute</p>
                </div>
            </div>

            <div className="emp-main-layout">
                {/* Input Card */}
                <div className="emp-card">
                    <div className="card-header-row">
                        <h3>Compute Salary</h3>
                    </div>
                    <form onSubmit={calculatePayroll} className="login-form">
                        <div className="form-group">
                            <label>Base Salary (₹)</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 85000" 
                                value={baseSalary} 
                                onChange={(e) => setBaseSalary(e.target.value)}
                                required 
                                min="1000"
                            />
                        </div>
                        <div className="form-group">
                            <label>Tax Rate (%)</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 15" 
                                value={taxRate} 
                                onChange={(e) => setTaxRate(e.target.value)}
                                required 
                                min="0" 
                                max="50"
                            />
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Processing on JVM...' : 'Calculate Now'}
                        </button>
                    </form>
                    {error && <div className="error-banner" style={{ marginTop: '1.5rem' }}>{error}</div>}
                </div>

                {/* Output Card */}
                <div className="emp-card">
                    <div className="card-header-row">
                        <h3>Calculation Results</h3>
                        {result && <span className="period-tag" style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Success</span>}
                    </div>
                    
                    {!result && !loading && (
                        <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0', background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border-glass)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧮</div>
                            Submit parameters to see the high-precision breakdown.
                        </div>
                    )}

                    {loading && (
                        <div style={{ color: 'var(--accent-purple)', textAlign: 'center', padding: '3rem 0' }}>
                            <div className="spinner" style={{ margin: '0 auto 1.5rem' }}></div>
                            Handshaking with Java Engine...
                        </div>
                    )}

                    {result && (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Compute Engine</span>
                                <span style={{ color: 'var(--accent-cyan)', fontWeight: '800', fontSize: '0.85rem' }}>{result.engine}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Base Salary</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '800' }}>₹{result.baseSalary.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>HRA Allowance <span style={{fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 'bold'}}>+40%</span></span>
                                <span style={{ color: 'var(--accent-green)', fontWeight: '800' }}>+ ₹{result.hra.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Provident Fund <span style={{fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold'}}>-12%</span></span>
                                <span style={{ color: '#ef4444', fontWeight: '800' }}>- ₹{result.pf.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Tax Applied</span>
                                <span style={{ color: '#ef4444', fontWeight: '800' }}>- ₹{result.taxApplied.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                            
                            <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))', padding: '24px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.1)', textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent-purple)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>Net Take-Home Salary</div>
                                <div style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1.5px' }}>
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

