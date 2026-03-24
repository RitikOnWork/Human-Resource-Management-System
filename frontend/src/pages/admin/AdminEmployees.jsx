import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
function AdminEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch the data from your working HR backend!
    fetch("/api/hr/employees", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // The backend sends { employees: [...] }
        setEmployees(data.employees || []);
      })
      .catch((err) => console.error("Failed to fetch employees", err));
  }, []);

  return (
    <AdminLayout>
      <h2>Employee Directory</h2>

      {employees.length === 0 ? (
        <p>No employees found. Go onboard someone!</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', marginTop: '20px' }}>
          {employees.map((emp) => (
            <div key={emp.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderTop: '4px solid #1d4ed8' }}>
              <h3 style={{ marginTop: '0', color: '#1f2937', marginBottom: '5px' }}>{emp.name}</h3>
              <p style={{ color: '#6b7280', marginTop: '0', fontSize: '0.9rem' }}>{emp.email}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
                <div><strong>Code:</strong> {emp.id}</div>
                <div><strong>Department:</strong> {emp.department}</div>
                <div><strong>Role:</strong> {emp.position}</div>
                <div>
                  <strong>Status:</strong> 
                  <span style={{ marginLeft: '8px', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
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