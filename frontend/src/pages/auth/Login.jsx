import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
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
      if (isSignUp) {
        // --- SIGNUP FLOW ---
        const response = await fetch("/api/auth/signup", {
          method: "POST",
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

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      sessionStorage.setItem('role', data.role);
      const role = (data.role || '').toLowerCase();
      
      if (role === "candidate") navigate("/candidate/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else if (role === "hr") navigate("/hr/dashboard");
      else if (role === "employee") navigate("/employee/dashboard");
      else setError("Unknown user role");
      
      }
    } catch (err) {
      setError("Server not reachable. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
    setError("");
    setMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-glow"></div>
      <div className="login-grid"></div>

      {/* Absolute positioned back button */}
      <Link to="/" className="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-badge">HR</div>
            <h2>{isSignUp ? "Create an Account" : "Welcome Back"}</h2>
            <p>{isSignUp ? "Join the HRMS Career Portal" : "Sign in to HRMS"}</p>
          </div>

          {error && <div className="error-banner">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bruce Wayne"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="role@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-header">
                <label>Password</label>
                {!isSignUp && <a href="#" className="forgot-link">Forgot password?</a>}
              </div>
              <div className="input-with-icon">
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
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="loader"></span> : (isSignUp ? "Sign Up" : "Sign In")}
            </button>
          </form>

          <div className="login-footer">
            {isSignUp ? (
              <>Already have an account? <a href="#" onClick={toggleMode}>Sign In here</a></>
            ) : (
              <>Don't have an account? <a href="#" onClick={toggleMode}>Create one now</a></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;