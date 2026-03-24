import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";
function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        {/* Render children if they exist, otherwise render the Router's Outlet */}
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default Layout;