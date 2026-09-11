import { Outlet } from "react-router-dom";
import AppSidebar from "../components/layout/AppSidebar.jsx";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import NotificationProvider from "../context/NotificationContext.jsx";

export default function MainLayout() {
    return (
        <NotificationProvider>
            <div className="min-h-screen bg-background">
                {/* Desktop sidebar */}
                <div className="hidden lg:block">
                    <AppSidebar />
                </div>

                {/* Main application area */}
                <div className="min-h-screen lg:pl-64">
                    {/* Mobile / tablet navbar */}
                    <div className="lg:hidden">
                        <AppNavbar />
                    </div>

                    {/* ROUTED CONTENT — always visible */}
                    <main className="min-h-screen">
                        <Outlet />
                    </main>
                </div>
            </div>
        </NotificationProvider>
    );
}