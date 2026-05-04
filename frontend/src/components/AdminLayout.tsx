import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const AdminLayout = ({ title, children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive ? "bg-yellow-500 text-white" : "text-teal-50 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-50">
      <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-teal-100 bg-white/95 px-2.5 py-2 backdrop-blur md:hidden">
          <div className="flex items-center gap-2">
            <img src="/schoollogo.webp" alt="School Logo" className="h-9 w-9 rounded-md border border-teal-100 bg-teal-50 p-1 object-contain" />
            <p className="text-sm font-bold text-teal-900">Darul Uloom Junaidia Ajmalia</p>
          </div>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="rounded-lg border border-teal-200 p-2 text-teal-800"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {sidebarOpen && (
          <button
            aria-label="Close sidebar overlay"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}

        <aside className={`fixed left-0 top-0 z-40 flex h-full w-[270px] -translate-x-full flex-col overflow-y-auto bg-gradient-to-b from-teal-700 to-teal-900 p-3 text-white shadow-2xl transition-transform duration-300 md:static md:w-auto md:translate-x-0 md:p-4 md:shadow-lg ${sidebarOpen ? "translate-x-0" : ""}`}>
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-2.5">
            <img src="/schoollogo.webp" alt="School Logo" className="h-12 w-12 rounded-lg bg-white/10 p-1.5 object-contain" />
            <div>
              <p className="text-xs text-teal-100">Admin Panel</p>
              <h1 className="text-sm font-bold leading-tight">Darul Uloom Junaidia Ajmalia</h1>
            </div>
          </div>

          <nav className="space-y-1.5">
            <NavLink to="/admin" end className={navClass} onClick={() => setSidebarOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/courses" className={navClass} onClick={() => setSidebarOpen(false)}>
              Courses
            </NavLink>
            <NavLink to="/admin/news" className={navClass} onClick={() => setSidebarOpen(false)}>
              Announcements
            </NavLink>
          </nav>

          <div className="mt-auto pt-4 space-y-2">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="block rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              ← Back to Home
            </Link>
            <Link
              to="/"
              onClick={() => {
                setSidebarOpen(false);
                localStorage.removeItem('adminToken');
              }}
              className="block rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-teal-800 transition hover:bg-yellow-100"
            >
              Logout
            </Link>
          </div>
        </aside>

        <main className="min-w-0 px-2 pb-2 pt-[64px] md:p-5">
          <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4 md:min-h-[calc(100vh-2.5rem)] md:p-5">
            <div className="mb-2.5 border-b border-slate-100 pb-2.5 sm:mb-4 sm:pb-3">
              <h2 className="text-lg font-bold text-teal-900 sm:text-2xl">{title}</h2>
            </div>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
