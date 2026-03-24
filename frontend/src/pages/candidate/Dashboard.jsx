import { useEffect, useState } from "react";
import CandidateLayout from "../../components/CandidateLayout";

function CandidateDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/candidate/dashboard", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <CandidateLayout>
      <h2>Candidate Dashboard</h2>

      {user && (
        <div className="card">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </CandidateLayout>
  );
}

export default CandidateDashboard;
