import { Routes, Route, Navigate } from "react-router-dom";

/* Public */
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
/* Auth wrapper */
import ProtectedRoute from "./components/ProtectedRoute";

/* Dashboards only */
import HRDashboard from "./pages/hr/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import CandidateDashboard from "./pages/candidate/Dashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import CandidateJobs from "./pages/candidate/Jobs";
import CandidateApplications from "./pages/candidate/Applications";
import CreateEmployee from "./pages/admin/CreateEmployee";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminCreateJob from "./pages/admin/CreateJob";
import PublicInfo from "./pages/PublicInfo";

function App() {
  return (
    
    <Routes>
      {/* Public */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      {/* Public Info Pages */}
        <Route path="/platform" element={<PublicInfo />} />
        <Route path="/solutions" element={<PublicInfo />} />
        <Route path="/privacy" element={<PublicInfo />} />
        <Route path="/compliance" element={<PublicInfo />} />
        <Route path="/contact" element={<PublicInfo />} />
      {/* HR Dashboard */}
      <Route
        path="/hr/dashboard"
        element={
          <ProtectedRoute role="admin">
            <HRDashboard />
          </ProtectedRoute>
        }
      />
<Route path="/hr/create-employee" element={
  <ProtectedRoute role="admin"> {/* Changed from 'hr' to 'admin' */}
    <CreateEmployee />
  </ProtectedRoute>
} />
<Route path="/hr/create-employee" element={
  <ProtectedRoute role="hr"> {/* Changed from 'hr' to 'admin' */}
    <CreateEmployee />
  </ProtectedRoute>
} />
      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Candidate Dashboard */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute role="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Dashboard */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
<Route path="/candidate/jobs" element={
  <ProtectedRoute role="candidate">
    <CandidateJobs />
  </ProtectedRoute>
} />
<Route path="/admin/employees" element={
  <ProtectedRoute role="admin">
    <AdminEmployees />
  </ProtectedRoute>
} />
<Route path="/admin/create-job" element={<AdminCreateJob />} />
<Route path="/candidate/applications" element={
  <ProtectedRoute role="candidate">
    <CandidateApplications />
  </ProtectedRoute>
} />
  
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
