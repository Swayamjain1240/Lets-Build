import { Menu } from "lucide-react";

import AppUserMenu from "./AppUserMenu";
import NotificationBell from "../notification/NotificationBell.jsx";

export default function AppNavbar({
    onMenuClick,
    sidebarOpen,
}) {
    return (
        <header
            className="
                sticky top-0 z-30
                flex h-16
                items-center justify-between
                border-b border-border
                bg-background/90
                px-5
                backdrop-blur-xl
                lg:px-8
            "
        >
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                    aria-controls="app-sidebar"
                    aria-expanded={sidebarOpen}
                    className="
                        rounded-lg
                        p-2
                        text-muted
                        transition-colors
                        hover:bg-surface
                        hover:text-heading
                        lg:hidden
                    "
                >
                    <Menu size={20} />
                </button>

                <div>
                    <p className="text-sm font-semibold text-heading">
                        Let's Build
                    </p>

                    <p className="hidden text-xs text-muted sm:block">
                        Your collaboration workspace
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <NotificationBell />

                <AppUserMenu />
            </div>
        </header>
    );
}