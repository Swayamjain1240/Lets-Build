import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { gsap, useGSAP } from "../../lib/gsap.js";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Subtle entrance animation
  useGSAP(
    () => {
      gsap.from(".auth-field", {
        opacity: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
      });
    },
    { scope: formRef }
  );

  // Update the corresponding input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit credentials to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (user.isOnboarded) {
        navigate("/home", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Login to continue building with your team."
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}
        <div className="auth-field">
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="auth-field">
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Backend error */}
        {error && (
          <div
            role="alert"
            className="
              rounded-xl
              border
              border-danger/20
              bg-danger/5
              px-4
              py-3
              text-sm
              text-danger
            "
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="auth-field">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        {/* Signup link */}
        <p className="auth-field text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="
              font-medium
              text-brand-400
              transition-colors
              hover:text-brand-500
            "
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;