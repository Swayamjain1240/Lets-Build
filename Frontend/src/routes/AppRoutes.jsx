import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Landing from "../pages/home/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Onboarding from "../pages/onboarding/Onboarding.jsx";

import Home from "../pages/home/Home.jsx";
import Developers from "../pages/developers/Developers.jsx";
import DeveloperProfile from "../pages/developers/DeveloperProfile.jsx";

import MyProfile from "../pages/profile/MyProfile.jsx";
import EditProfile from "../pages/profile/EditProfile.jsx";

import Projects from "../pages/projects/Projects.jsx";
import CreateProject from "../pages/projects/CreateProject.jsx";
import ProjectDetails from "../pages/projects/ProjectDetails.jsx";
import EditProject from "../pages/projects/EditProject.jsx";

import Recruitments from "../pages/recruitments/Recruitments.jsx";
import CreateRecruitment from "../pages/recruitments/CreateRecruitment.jsx";
import RecruitmentDetails from "../pages/recruitments/RecruitmentDetails.jsx";
import EditRecruitment from "../pages/recruitments/EditRecruitment.jsx";

import Recommendations from "../pages/recommendations/Recommendations.jsx";

import Requests from "../pages/requests/Requests.jsx";

import ProtectedRoute from "./ProtectRoute.jsx";
import OnboardingRoute from "./OnboardingRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

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
      <Route path="/" element={<Landing />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<OnboardingRoute />}>
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />

          <Route
            path="/developers"
            element={<Developers />}
          />

          <Route
            path="/developers/:id"
            element={<DeveloperProfile />}
          />

          <Route
            path="/profile"
            element={<MyProfile />}
          />

          <Route
            path="/profile/edit"
            element={<EditProfile />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/new"
            element={<CreateProject />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/projects/:id/edit"
            element={<EditProject />}
          />

          <Route
            path="/recruitments"
            element={<Recruitments />}
          />

          <Route
            path="/recruitments/new"
            element={<CreateRecruitment />}
          />

          <Route
            path="/recruitments/:id"
            element={<RecruitmentDetails />}
          />

          <Route
            path="/recruitments/:id/edit"
            element={<EditRecruitment />}
          />

          <Route
            path="/recommendations"
            element={<Recommendations />}
          />

          <Route
            path="/requests"
            element={<Requests />}
          />

          <Route
            path="/messages"
            element={<ComingSoon title="Messages" />}
          />

          <Route
            path="/notifications"
            element={<ComingSoon title="Notifications" />}
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