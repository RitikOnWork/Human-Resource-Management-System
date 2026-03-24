import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import apiFetch from "../../services/api"; // <-- Use your custom fetch

function AdminApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Cleaner fetch
    apiFetch(`/api/admin/job/${jobId}/applications`)
      .then((data) => setApplications(data))
      .catch((err) => console.error("Failed to load applications", err));
  }, [jobId]);

  const shortlist = async (applicationId) => {
    try {
      await apiFetch(`/api/admin/application/${applicationId}/shortlist`, {
        method: "POST"
      });
      
      // Update the UI instantly on success
      setApplications((prev) =>
        prev.map((a) =>
          a.application_id === applicationId
            ? { ...a, status: "shortlisted" }
            : a
        )
      );
    } catch (err) {
      alert(err.message || "Failed to shortlist candidate");
    }
  };

  return (
    <AdminLayout>
      <h2>Applications</h2>

      {applications.length === 0 ? (
        <p>No applications for this job yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
          {applications.map((app) => (
            <div key={app.application_id} className="card" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <p><strong>Name:</strong> {app.candidate_name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Status:</strong> {app.status.toUpperCase()}</p>

              {app.status !== "shortlisted" && (
                <button 
                  onClick={() => shortlist(app.application_id)}
                  style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                >
                  Shortlist Candidate
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminApplications;