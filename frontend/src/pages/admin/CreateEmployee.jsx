import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function CreateEmployee() {
  const [form, setForm] = useState({
    candidate_id: "",
    employee_code: "",
    department: "",
    designation: "",
    pay_grade: "",
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
      department: "",
      designation: "",
      pay_grade: "",
      date_of_joining: "",
    });
  };

  return (
    <AdminLayout>
      <h2>Create Employee</h2>

      {error && <p className="error">{error}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className="card">
        <input
          name="candidate_id"
          placeholder="Candidate ID"
          value={form.candidate_id}
          onChange={handleChange}
          required
        />

        <input
          name="employee_code"
          placeholder="Employee Code"
          value={form.employee_code}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />

        <input
          name="pay_grade"
          placeholder="Pay Grade"
          value={form.pay_grade}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date_of_joining"
          value={form.date_of_joining}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Employee</button>
      </form>
    </AdminLayout>
  );
}

export default CreateEmployee;
