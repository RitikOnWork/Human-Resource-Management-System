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
        <h2 style={{ margin: 0, color: '#f9fafb' }}>Admin Dashboard</h2>
        
        {/* NEW: The button that links to your Create Job page */}
        <Link to="/admin/create-job" style={{ textDecoration: 'none' }}>
          <button style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Neon Green gradient
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)'
          }}>
            + Create New Job
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {jobs.map((job) => (
          <div key={job._id} style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <h4 style={{ marginTop: '0', color: '#8b5cf6', fontSize: '1.2rem', marginBottom: '16px' }}>{job.title}</h4>
            <p style={{ color: '#d1d5db', marginBottom: '8px' }}><strong>Department:</strong> {job.department}</p>
            <p style={{ color: '#d1d5db', marginBottom: '8px' }}><strong>Status:</strong> <span style={{ color: '#06b6d4' }}>{job.status}</span></p>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}><strong>Vacancies:</strong> {job.vacancies}</p>

            <div style={{ marginTop: '15px' }}>
<<<<<<< HEAD
                <button onClick={() => alert("Applications view is under construction.")} style={{ background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)', color: '#9ca3af', padding: '10px 16px', border: 'none', borderRadius: '6px', cursor: 'not-allowed', fontWeight: 'bold', width: '100%' }}>
                  View Applications (Coming Soon)
=======
              <Link to={`/admin/job/${job._id}/applications`}>
                <button style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
                  View Applications
>>>>>>> 376d7df58767ed276fda46bd82d1aa5ba19cb3a8
                </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;