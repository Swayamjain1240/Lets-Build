import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppSidebar from "../components/layout/AppSidebar.jsx";
import AppNavbar from "../components/layout/AppNavbar.jsx";

import NotificationProvider from "../context/NotificationContext.jsx";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <NotificationProvider>
            <div className="min-h-screen bg-background">
                <AppSidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="min-h-screen lg:ml-64">
                    <AppNavbar
                        onMenuClick={() =>
                            setSidebarOpen(true)
                        }
                    />

                    <main className="min-h-screen px-4 pb-8 pt-20 sm:px-6 lg:px-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </NotificationProvider>
    );
}