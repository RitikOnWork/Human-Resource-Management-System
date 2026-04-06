import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/api/hr/employees", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.employees || []).map((emp) => ({
          id: emp.employee_code || emp._id,
          name: emp.user?.name || "Unknown",
          email: emp.user?.email || "",
          department: emp.department,
          position: emp.designation,
          status: emp.status || "active",
          joinedDate: emp.date_of_joining
            ? new Date(emp.date_of_joining).toLocaleDateString()
            : "",
        }));
        setEmployees(mapped);
      })
      .catch((err) => console.error("Failed to fetch employees", err));
  }, []);

  return (
    <AdminLayout>
      <h2 style={{ color: '#f9fafb' }}>Employee Directory</h2>

      {employees.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>No employees found. Go onboard someone!</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', marginTop: '20px' }}>
          {employees.map((emp) => (
            <div key={emp.id} style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>
              <h3 style={{ marginTop: '0', color: '#8b5cf6', marginBottom: '5px' }}>{emp.name}</h3>
              <p style={{ color: '#9ca3af', marginTop: '0', fontSize: '0.9rem' }}>{emp.email}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px', color: '#d1d5db' }}>
                <div><strong>Code:</strong> {emp.id}</div>
                <div><strong>Department:</strong> {emp.department}</div>
                <div><strong>Role:</strong> {emp.position}</div>
                <div><strong>Joined:</strong> {emp.joinedDate}</div>
                <div>
                  <strong>Status:</strong>
                  <span style={{ marginLeft: '8px', backgroundColor: emp.status === 'active' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: emp.status === 'active' ? '#10b981' : '#ef4444', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {emp.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminEmployees;
