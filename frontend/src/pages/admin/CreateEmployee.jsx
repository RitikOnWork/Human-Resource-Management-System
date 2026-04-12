import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./admin.css";

function CreateEmployee() {
  const [form, setForm] = useState({
    candidate_id: "",
    employee_code: "",
    department: "Engineering",
    designation: "",
    pay_grade: "L1",
    date_of_joining: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/hr/create-employee", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create employee");
        return;
      }

      setMessage("Employee created successfully");
      setForm({
        candidate_id: "",
        employee_code: "",
        department: "Engineering",
        designation: "",
        pay_grade: "L1",
        date_of_joining: "",
      });
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <h2 className="admin-title">Onboard New Employee</h2>
      </div>

      <div className="admin-container" style={{ padding: '0' }}>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label>Candidate ID</label>
            <input
              name="candidate_id"
              placeholder="e.g. CAND001"
              value={form.candidate_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Employee Code</label>
            <input
              name="employee_code"
              placeholder="e.g. EMP101"
              value={form.employee_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Operations">Operations</option>
              <option value="Customer Success">Customer Success</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              name="designation"
              placeholder="e.g. Software Engineer"
              value={form.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pay Grade</label>
            <select name="pay_grade" value={form.pay_grade} onChange={handleChange}>
              <option value="L1">L1 - Entry</option>
              <option value="L2">L2 - Mid</option>
              <option value="L3">L3 - Senior</option>
              <option value="M1">M1 - Manager</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Joining</label>
            <input
              type="date"
              name="date_of_joining"
              value={form.date_of_joining}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Complete Onboarding</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateEmployee;
