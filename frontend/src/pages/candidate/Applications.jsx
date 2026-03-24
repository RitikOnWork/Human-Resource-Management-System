import { useEffect, useState } from "react";
import CandidateLayout from "../../components/CandidateLayout";

function CandidateApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch("/api/candidate/applications", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <CandidateLayout>
      <h2>My Applications</h2>

      {loading ? (
        <p>Loading your applications...</p>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <p>You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div className="job-list">
          {applications.map((app) => (
            <div key={app.application_id} className="job-card">
              <h4>{app.job_title}</h4>
              <p>Department: {app.department}</p>
              <p>Status: <strong>{app.status}</strong></p>
              <p>Applied On: {app.applied_on}</p>
            </div>
          ))}
        </div>
      )}
    </CandidateLayout>
  );
}

export default CandidateApplications;