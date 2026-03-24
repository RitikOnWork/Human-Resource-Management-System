
// Inside your AdminNavbar.jsx links section:
<NavLink 
  to="/admin/create-job" 
  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
>
  Post Job
</NavLink>