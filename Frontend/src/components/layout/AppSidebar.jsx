import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { navigation } from "./navigation";

export default function AppSidebar({
    open = false,
    onClose = () => {},
}) {
    return (
        <>
            {/* Mobile backdrop */}
            {open && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={onClose}
                    className="
                        fixed inset-0 z-40
                        bg-black/60
                        lg:hidden
                    "
                />
            )}

            {/* Sidebar */}
            <aside
                id="app-sidebar"
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50

                    flex
                    h-screen
                    w-64
                    shrink-0
                    flex-col

                    border-r
                    border-border
                    bg-background

                    transition-transform
                    duration-200

                    ${
                        open
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }

                    lg:z-30
                    lg:translate-x-0
                `}
            >
                {/* Logo */}
                <div
                    className="
                        flex h-16
                        items-center
                        justify-between
                        border-b
                        border-border-soft
                        px-5
                    "
                >
                    <NavLink
                        to="/home"
                        onClick={onClose}
                        className="flex items-center gap-2"
                    >
                        <div
                            className="
                                flex h-8 w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-brand-500
                                font-bold
                                text-white
                            "
                        >
                            L
                        </div>

                        <span className="font-bold text-heading">
                            Let's Build
                        </span>
                    </NavLink>

                    {/* Mobile close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="
                            text-muted
                            transition-colors
                            hover:text-heading
                            lg:hidden
                        "
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav
                    aria-label="Main navigation"
                    className="
                        flex-1
                        space-y-1
                        overflow-y-auto
                        px-3
                        py-5
                    "
                >
                    {navigation.map(
                        ({
                            label,
                            path,
                            icon: Icon,
                        }) => (
                            <NavLink
                                key={path}
                                to={path}
                                end={
                                    path ===
                                    "/home"
                                }
                                onClick={onClose}
                                className={({
                                    isActive,
                                }) => `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition-colors
                                    duration-200

                                    ${
                                        isActive
                                            ? "bg-brand-500/10 text-brand-400"
                                            : "text-muted hover:bg-surface hover:text-heading"
                                    }
                                `}
                            >
                                <Icon size={18} />

                                <span>
                                    {label}
                                </span>
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Footer */}
                <div
                    className="
                        border-t
                        border-border-soft
                        px-5
                        py-4
                    "
                >
                    <p className="text-xs text-muted">
                        Developer collaboration platform
                    </p>
                </div>
            </aside>
        </>
    );
}