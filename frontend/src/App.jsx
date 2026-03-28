import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Standard components that need to be loaded immediately
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/PublicLayout";

// --- LAZY-LOADED COMPONENTS FOR PERFORMANCE OPTIMIZATION ---

// Public Pages
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/auth/Login"));
const PublicInfo = lazy(() => import("./pages/PublicInfo"));
const Platform = lazy(() => import("./pages/Platform"));
const Solutions = lazy(() => import("./pages/Solutions"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const NotFound = lazy(() => import("./pages/NotFound"));

// HR Dashboards
const HRDashboard = lazy(() => import("./pages/hr/Dashboard"));

// Admin Dashboards
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const CreateEmployee = lazy(() => import("./pages/admin/CreateEmployee"));
const AdminEmployees = lazy(() => import("./pages/admin/AdminEmployees"));
const AdminCreateJob = lazy(() => import("./pages/admin/CreateJob"));

// Candidate Dashboards
const CandidateDashboard = lazy(() => import("./pages/candidate/Dashboard"));
const CandidateJobs = lazy(() => import("./pages/candidate/Jobs"));
const CandidateApplications = lazy(() => import("./pages/candidate/Applications"));

// Employee Dashboards
const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard"));

// A simple loading fallback for Suspense
const GlobalLoader = () => (
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b0f19' }}>
    <div style={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 'bold' }}>Loading...</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Routes>
        {/* --- PUBLIC LAYOUT ROUTES --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/privacy" element={<PublicInfo />} />
          <Route path="/compliance" element={<PublicInfo />} />
          <Route path="/contact" element={<PublicInfo />} />
        </Route>

        {/* --- STANDALONE / AUTH PAGES --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/demo" element={<BookDemo />} />

        {/* --- SECURE ADMIN / HR ROUTES --- */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute role="admin">
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Fixed Security: Made Admin specific, removed duplicates */}
        <Route
          path="/hr/create-employee"
          element={
            <ProtectedRoute role="admin">
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute role="admin">
              <AdminEmployees />
            </ProtectedRoute>
          }
        />

        {/* SECURED ROUTE: Previously this was completely public! */}
        <Route
          path="/admin/create-job"
          element={
            <ProtectedRoute role="admin">
              <AdminCreateJob />
            </ProtectedRoute>
          }
        />

        {/* --- SECURE CANDIDATE ROUTES --- */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/jobs"
          element={
            <ProtectedRoute role="candidate">
              <CandidateJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/applications"
          element={
            <ProtectedRoute role="candidate">
              <CandidateApplications />
            </ProtectedRoute>
          }
        />

        {/* --- SECURE EMPLOYEE ROUTES --- */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* --- NOT FOUND FALLBACK --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
