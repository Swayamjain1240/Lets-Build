import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Landing from "../pages/home/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Onboarding from "../pages/onboarding/Onboarding";
import Home from "../pages/home/Home";

import ProtectedRoute from "./ProtectedRoute";
import OnboardingRoute from "./OnboardingRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";

const ComingSoon = ({ title }) => (
  <div className="rounded-2xl border border-border bg-surface p-8">
    <h1 className="text-2xl font-semibold text-heading">
      {title}
    </h1>

    <p className="mt-3 text-sm text-muted">
      This feature will be built in the next chapters.
    </p>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public landing */}
      <Route path="/" element={<Landing />} />

      {/* Login / Signup */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Incomplete users */}
      <Route element={<OnboardingRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>

      {/* Completed users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />

          <Route
            path="/developers"
            element={<ComingSoon title="Developers" />}
          />

          <Route
            path="/projects"
            element={<ComingSoon title="My Projects" />}
          />

          <Route
            path="/recruitments"
            element={<ComingSoon title="Recruitments" />}
          />

          <Route
            path="/recommendations"
            element={<ComingSoon title="Recommendations" />}
          />

          <Route
            path="/requests"
            element={<ComingSoon title="Requests" />}
          />

          <Route
            path="/messages"
            element={<ComingSoon title="Messages" />}
          />

          <Route
            path="/notifications"
            element={<ComingSoon title="Notifications" />}
          />

          <Route
            path="/profile"
            element={<ComingSoon title="My Profile" />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/home" replace />}
      />
    </Routes>
  );
}