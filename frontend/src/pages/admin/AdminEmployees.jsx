import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./admin.css";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch employees", err);
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout>
      <div className="admin-header">
        <h2 className="admin-title">Employee Directory</h2>
        <span className="admin-subtitle">{employees.length} Members Total</span>
      </div>

      <div className="admin-container" style={{ padding: '0' }}>
        {loading ? (
             <div className="status-message">Loading Directory...</div>
        ) : employees.length === 0 ? (
          <div className="status-message" style={{ color: '#9ca3af' }}>No employees found. Go onboard someone!</div>
        ) : (
          <div className="admin-grid" style={{ marginTop: '20px' }}>
            {employees.map((emp) => (
              <div key={emp.id} className="card employee-item">
                <div className="employee-card-header">
                    <div className="employee-avatar-large">{emp.name.charAt(0)}</div>
                    <div className="employee-main-info">
                        <h3 className="employee-name-dir">{emp.name}</h3>
                        <p className="employee-email-dir">{emp.email}</p>
                    </div>
                </div>

                <div className="employee-details-grid">
                  <div className="detail-row"><strong>Code:</strong> <span>{emp.id}</span></div>
                  <div className="detail-row"><strong>Department:</strong> <span>{emp.department}</span></div>
                  <div className="detail-row"><strong>Role:</strong> <span>{emp.position}</span></div>
                  <div className="detail-row"><strong>Joined:</strong> <span>{emp.joinedDate}</span></div>
                </div>
                
                <div className="employee-status-row">
                    <span className={`status-pill ${emp.status.toLowerCase()}`}>
                      {emp.status.toUpperCase()}
                    </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminEmployees;
