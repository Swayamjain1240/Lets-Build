import { Routes, Route } from "react-router-dom";

import Landing from "../pages/home/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Onboarding from "../pages/onboarding/Onboarding";

import ProtectedRoute from "./ProtectedRoute";

const DashboardPlaceholder = () => (
  <main className="flex min-h-screen items-center justify-center bg-background px-5 text-heading">
    <div className="text-center">
      <h1 className="text-2xl font-semibold">
        Welcome to Let's Build
      </h1>

      <p className="mt-3 text-muted">
        Your profile is ready. The main application comes next.
      </p>
    </div>
  </main>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<DashboardPlaceholder />} />
      </Route>
    </Routes>
  );
}