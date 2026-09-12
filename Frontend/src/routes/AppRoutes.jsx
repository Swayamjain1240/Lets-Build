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

import Recruitments from "../pages/recrutments/Recruitments.jsx";
import CreateRecruitment from "../pages/recrutments/CreateRecruitment.jsx";
import RecruitmentDetails from "../pages/recrutments/RecruitmentDetails.jsx";
import EditRecruitment from "../pages/recrutments/EditRecruitment.jsx";

import Recommendations from "../pages/recommendations/Recommendations.jsx";

import Requests from "../pages/request/Requests.jsx";

import Notifications from "../pages/notifications/Notifications.jsx";

import Messages from "../pages/messages/Messages.jsx";

import ProtectedRoute from "./ProtectRoute.jsx";
import OnboardingRoute from "./OnboardingRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

import MainLayout from "../layouts/MainLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing */}
      <Route
        path="/"
        element={<Landing />}
      />

      {/* Public Authentication */}
      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      </Route>

      {/* Onboarding */}
      <Route element={<OnboardingRoute />}>
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />
      </Route>

      {/* Protected Application */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route
            path="/home"
            element={<Home />}
          />

          {/* Developers */}
          <Route
            path="/developers"
            element={<Developers />}
          />

          <Route
            path="/developers/:id"
            element={<DeveloperProfile />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<MyProfile />}
          />

          <Route
            path="/profile/edit"
            element={<EditProfile />}
          />

          {/* Projects */}
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

          {/* Recruitments */}
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

          {/* AI Recommendations */}
          <Route
            path="/recommendations"
            element={<Recommendations />}
          />

          {/* Collaboration Requests */}
          <Route
            path="/requests"
            element={<Requests />}
          />

          {/* Messaging */}
          <Route
            path="/messages"
            element={<Messages />}
          />

          <Route
            path="/messages/:conversationId"
            element={<Messages />}
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={<Notifications />}
          />
        </Route>
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to="/home"
            replace
          />
        }
      />
    </Routes>
  );
}