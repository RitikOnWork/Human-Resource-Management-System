import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import AdminLayout from "../../components/AdminLayout";
import apiFetch from "../../services/api"; 

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    apiFetch("/api/admin/dashboard")
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load dashboard", err));
  }, []);

  return (
    <AdminLayout>
      {/* NEW: Flex container to put Title on left and Button on right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        
        {/* NEW: The button that links to your Create Job page */}
        <Link to="/admin/create-job" style={{ textDecoration: 'none' }}>
          <button style={{ 
            backgroundColor: '#16a34a', // A nice green color for 'create' actions
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            + Create New Job
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {jobs.map((job) => (
          <div key={job.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ marginTop: '0', color: '#1d4ed8' }}>{job.title}</h4>
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Vacancies:</strong> {job.vacancies}</p>
            
            <div style={{ marginTop: '15px' }}>
              <Link to={`/admin/job/${job.id}/applications`}>
                <button style={{ backgroundColor: '#1d4ed8', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  View Applications
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;