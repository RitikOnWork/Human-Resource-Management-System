import AdminNavbar from "./AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      
      <main className="admin-content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;