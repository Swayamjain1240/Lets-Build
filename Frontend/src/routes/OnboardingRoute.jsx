import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import SessionScreen from "../components/common/SessionScreen";

export default function OnboardingRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SessionScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isOnboarded) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}