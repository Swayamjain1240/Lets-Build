import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppNavbar from "../components/layout/AppNavbar.jsx";
import AppSidebar from "../components/layout/AppSidebar.jsx";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile navigation after changing pages.
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Allow Escape to close the mobile sidebar.
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background text-body lg:flex">
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <AppNavbar
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}