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

// Auth Pages
const Signup = lazy(() => import("./pages/auth/Signup"));

// HR Dashboards
const HRDashboard = lazy(() => import("./pages/hr/Dashboard"));

// Admin Dashboards
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const CreateEmployee = lazy(() => import("./pages/admin/CreateEmployee"));
const AdminEmployees = lazy(() => import("./pages/admin/AdminEmployees"));
const AdminCreateJob = lazy(() => import("./pages/admin/CreateJob"));
const AdminApplications = lazy(() => import("./pages/admin/Applications"));

// Manager Dashboards
const ManagerDashboard = lazy(() => import("./pages/manager/ManagerDashboard"));

// Employee Dashboards
const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard"));

// Candidate Dashboards
const CandidatePortal = lazy(() => import("./pages/candidate/CandidatePortal"));

// A simple loading fallback for Suspense
const GlobalLoader = () => (
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)' }}>
    <div style={{ color: '#4f46e5', fontSize: '1.5rem', fontWeight: 'bold' }}>Loading...</div>
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<BookDemo />} />

        {/* --- SECURE ADMIN / HR ROUTES --- */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute roles={['admin', 'hr']}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-employee"
          element={
            <ProtectedRoute roles={['admin']}>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminEmployees />
            </ProtectedRoute>
          }
        />

        {/* SECURED ROUTE: Previously this was completely public! */}
        <Route
          path="/admin/create-job"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminCreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/job/:jobId/applications"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminApplications />
            </ProtectedRoute>
          }
        />

        {/* --- SECURE MANAGER ROUTES --- */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute roles={['admin', 'hr', 'manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* --- SECURE EMPLOYEE ROUTES --- */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute roles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate/portal"
          element={
            <ProtectedRoute roles={['candidate']}>
              <CandidatePortal />
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
