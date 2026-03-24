import { NavLink } from "react-router-dom";

const menuConfig = {
  candidate: [
    { label: "Dashboard", path: "/candidate/dashboard" },
    { label: "Jobs", path: "/candidate/jobs" },
    { label: "My Applications", path: "/candidate/applications" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
  ],
  HR: [
    { label: "Dashboard", path: "/hr/dashboard" },
    { label: "Create Employee", path: "/hr/create-employee" },
    { label: "Transfer Employee", path: "/hr/transfer" },
  ],
  employee: [
    { label: "Dashboard", path: "/employee/dashboard" }
  ]
};

function Sidebar() {
  const role = sessionStorage.getItem("role");

  const menus = menuConfig[role] || [];

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Nagar Yukt HRMS</h3>

      <nav>
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
