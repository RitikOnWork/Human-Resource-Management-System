import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // We can reuse your existing login styles!

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
      } else {
        setMessage("Account created successfully! Redirecting to login...");
        // Wait 2 seconds so they can read the success message, then redirect
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError("Network error. Please make sure the backend is running.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create an Account</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>Join the Nagar Yukt Career Portal</p>
        
        {error && <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        {message && <div className="success-message" style={{ color: "green", marginBottom: "10px" }}>{message}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name (e.g., Bruce Wayne)"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Create a Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          <button type="submit" style={{ padding: '12px', backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#ea580c', fontWeight: 'bold' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;