import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import apiFetch from "../../services/api"; // Using your awesome API utility!

function AdminCreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    vacancies: 1,
    eligibility_rules: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      // Sending data to the backend route you shared
      await apiFetch("/api/admin/create-job", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          // Ensure vacancies is sent as a number
          vacancies: parseInt(formData.vacancies, 10), 
        }),
      });

      setMessage("Success! The new job has been posted.");
      // Reset the form
      setFormData({
        title: "",
        department: "",
        location: "",
        vacancies: 1,
        eligibility_rules: "",
      });
    } catch (err) {
      setError(err.message || "Failed to create the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <h2>Create a New Job Posting</h2>

      {/* Status Messages */}
      {error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}
      {message && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{message}</div>}

      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#374151' }}>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Senior React Developer"
              required
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#374151' }}>Department *</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Engineering"
              required
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
              <label style={{ fontWeight: 'bold', color: '#374151' }}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Remote / Delhi"
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100px' }}>
              <label style={{ fontWeight: 'bold', color: '#374151' }}>Vacancies</label>
              <input
                type="number"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
                min="1"
                required
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#374151' }}>Eligibility Rules (Optional)</label>
            <textarea
              name="eligibility_rules"
              value={formData.eligibility_rules}
              onChange={handleChange}
              placeholder="e.g., Minimum 3 years experience in MERN stack..."
              rows="4"
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              marginTop: '10px',
              backgroundColor: isSubmitting ? '#93c5fd' : '#1d4ed8', 
              color: 'white', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {isSubmitting ? "Posting Job..." : "Post New Job"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminCreateJob;