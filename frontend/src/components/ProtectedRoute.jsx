import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, roles }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
<<<<<<< HEAD
        if (data && data.user && data.user.role) {
          const userRole = data.user.role.toLowerCase();
          const allowedRoles = roles.map(r => r.toLowerCase());
          if (allowedRoles.includes(userRole)) {
=======
        if (data && data.user) {
          const userRole = (data.user.role || "").toLowerCase();
          const requiredRole = (role || "").toLowerCase();
          // Admin can access admin and hr routes
          if (userRole === requiredRole || (userRole === "admin" && requiredRole === "hr")) {
>>>>>>> 376d7df58767ed276fda46bd82d1aa5ba19cb3a8
            setAuthorized(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setAuthorized(false);
        setLoading(false);
      });
  }, [roles]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b0f19' }}>
        <div style={{ color: '#a78bfa', fontSize: '1.2rem' }}>Authenticating...</div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
