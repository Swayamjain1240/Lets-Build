import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, UserRound } from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function AppUserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      // AuthContext clears the local token even if
      // the stateless backend logout request fails.
      console.error("Logout request failed:", error);
    } finally {
      setOpen(false);
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-label="User menu"
        className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-surface"
      >
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface-soft">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={19} className="text-muted" />
          )}
        </div>

        <span className="hidden max-w-28 truncate text-sm font-medium text-heading sm:block">
          {user?.name || "Developer"}
        </span>

        <ChevronDown size={15} className="hidden text-muted sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-surface p-2 shadow-xl">
          <div className="border-b border-border-soft px-3 py-2">
            <p className="truncate text-sm font-medium text-heading">
              {user?.name}
            </p>

            <p className="truncate text-xs text-muted">
              {user?.email}
            </p>
          </div>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body hover:bg-surface-hover hover:text-heading"
          >
            <UserRound size={17} />
            My Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-body hover:bg-surface-hover hover:text-heading disabled:opacity-50"
          >
            <LogOut size={17} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}