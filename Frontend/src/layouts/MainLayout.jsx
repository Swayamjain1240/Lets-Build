import { Outlet } from "react-router-dom";

import AppSidebar from "../components/layout/AppSidebar.jsx";
import AppNavbar from "../components/layout/AppNavbar.jsx";

import NotificationProvider from "../context/NotificationContext.jsx";

export default function MainLayout() {
    return (
        <NotificationProvider>
            <div className="min-h-screen bg-background">
                
                {/* Fixed Sidebar */}
                <AppSidebar />

                {/* Right side application area */}
                <div className="min-h-screen lg:ml-64">
                    
                    {/* Navbar - visible on ALL screen sizes */}
                    <AppNavbar />

                    {/* Main page content */}
                    <main
                        className="
                            min-h-screen
                            px-4
                            pb-8
                            pt-10
                            sm:px-6
                            lg:px-8
                        "
                    >
                        <Outlet />
                    </main>

                </div>
            </div>
        </NotificationProvider>
    );
}