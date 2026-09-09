import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import SessionScreen from "../components/common/SessionScreen";

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SessionScreen />;
  }

  if (user) {
    return (
      <Navigate
        to={user.isOnboarded ? "/home" : "/onboarding"}
        replace
      />
    );
  }

  return <Outlet />;
}