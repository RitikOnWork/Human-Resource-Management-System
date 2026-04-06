import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
<<<<<<< HEAD
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
=======
      if (isSignUp) {
        // --- SIGNUP FLOW ---
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.error || "Failed to create account");
          setLoading(false);
          return;
        }

        setMessage("Account created successfully! Please sign in.");
        setIsSignUp(false); // switch to login mode
        setPassword(""); // clear password
      } else {
        // --- LOGIN FLOW ---
        const response = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
>>>>>>> 376d7df58767ed276fda46bd82d1aa5ba19cb3a8

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      const role = (data.role || '').toLowerCase();
      
      if (role === "manager") navigate("/manager/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else if (role === "hr") navigate("/hr/dashboard");
      else if (role === "employee") navigate("/employee/dashboard");
      else setError("Unknown user role");

    } catch (err) {
      setError("Server not reachable. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glow"></div>
      <div className="login-grid"></div>

      <Link to="/" className="back-button">
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-badge">HR</div>
            <h2>Welcome Back</h2>
            <p>Sign in to HRMS</p>
          </div>

          {error && <div className="error-banner">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-left-icon">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  placeholder="role@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-header">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-with-left-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="loader"></span> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;