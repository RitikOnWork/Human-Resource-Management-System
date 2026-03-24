import { useEffect, useState } from "react";
import CandidateLayout from "../../components/CandidateLayout";
import apiFetch from "../../services/api"; // <-- Importing your api.js here!

function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  
  // NEW: Keep track of which jobs the user has applied to on this page
  const [appliedJobs, setAppliedJobs] = useState([]);
  // NEW: Keep track of which button is currently loading
  const [applyingTo, setApplyingTo] = useState(null);

  const fetchJobs = async () => {
    const params = new URLSearchParams();
    if (department) params.append("department", department);
    if (location) params.append("location", location);

    try {
      // Using your apiFetch instead of raw fetch
      const data = await apiFetch(`/api/candidate/jobs?${params.toString()}`);
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    setApplyingTo(jobId); // Changes button to "Applying..."

    try {
      // Using your apiFetch! It handles the JSON parsing and error checking for us.
      await apiFetch("/api/candidate/apply", {
        method: "POST",
        body: JSON.stringify({ job_id: jobId }),
      });

      // If successful, add this job's ID to our list of applied jobs
      setAppliedJobs((prev) => [...prev, jobId]);

    } catch (err) {
      // If the backend sends an error (like "You already applied"), apiFetch throws it here
      alert(err.message || "Failed to apply");
    } finally {
      setApplyingTo(null); // Stop the loading state
    }
  };

  return (
    <CandidateLayout>
      <h2>Available Jobs</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchJobs}>Filter</button>
      </div>

      <div className="job-list">
        {jobs.map((job) => {
          // Check if the current job is in our applied list or currently loading
          const hasApplied = appliedJobs.includes(job.id);
          const isApplying = applyingTo === job.id;

          return (
            <div key={job.id} className="job-card" style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
              <h4>{job.title}</h4>
              <p>Department: {job.department}</p>
              <p>Location: {job.location}</p>
              <p>Vacancies: {job.vacancies}</p>
              
              <button 
                onClick={() => handleApply(job.id)}
                disabled={hasApplied || isApplying} // Disable the button if already applied
                style={{ 
                  // Change color to green if applied, otherwise keep it orange
                  backgroundColor: hasApplied ? '#28a745' : '#ea580c', 
                  color: 'white', 
                  padding: '8px 16px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  // Change the cursor so it doesn't look clickable anymore
                  cursor: hasApplied || isApplying ? 'not-allowed' : 'pointer',
                  opacity: isApplying ? 0.7 : 1
                }}
              >
                {/* Dynamically change the text on the button */}
                {isApplying ? "Applying..." : hasApplied ? "Applied ✓" : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>
    </CandidateLayout>
  );
}

export default CandidateJobs;