import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import AppSidebar from "../components/layout/AppSidebar.jsx";
import AppNavbar from "../components/layout/AppNavbar.jsx";

import NotificationProvider from "../context/NotificationContext.jsx";

export default function MainLayout() {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <div className="lg:pl-64">
          <AppNavbar
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}