import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useNotifications from "../../hooks/useNotifications.js";

export default function NotificationBell() {
    const navigate = useNavigate();

    const {
        unreadCount = 0,
    } = useNotifications();

    return (
        <button
            type="button"
            onClick={() =>
                navigate("/notifications")
            }
            className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                text-muted
                transition-colors
                hover:bg-surface
                hover:text-heading
            "
            aria-label={`Notifications, ${unreadCount} unread`}
        >
            <Bell size={21} />

            {unreadCount > 0 && (
                <span
                    className="
                        absolute
                        -right-1
                        -top-1
                        flex
                        h-5
                        min-w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        px-1
                        text-[10px]
                        font-bold
                        leading-none
                        text-white
                    "
                >
                    {unreadCount > 99
                        ? "99+"
                        : unreadCount}
                </span>
            )}
        </button>
    );
}