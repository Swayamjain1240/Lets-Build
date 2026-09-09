import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import SessionScreen from "../components/common/SessionScreen";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Wait while AuthContext restores the session.
  if (loading) {
    return <SessionScreen />;
  }

  // 2. No authenticated user → Login.
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // 3. Authenticated but onboarding incomplete.
  if (!user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  // 4. Authenticated + onboarded → render protected page.
  return <Outlet />;
}