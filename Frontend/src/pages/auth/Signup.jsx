import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { gsap, useGSAP } from "../../lib/gsap";
import useAuth from "../../hooks/useAuth";


const Signup = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        stagger: 0.06,
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

  // Validate and submit signup data
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const user = await signup({
        name: formData.name.trim(),
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
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Set up your developer account and start finding people worth building with."
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Full name */}
        <div className="auth-field">
          <Input
            id="name"
            name="name"
            label="Full name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>

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
            placeholder="Minimum 6 characters"
            minLength={6}
            autoComplete="new-password"
            required
          />
        </div>

        {/* Confirm password */}
        <div className="auth-field">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter password again"
            autoComplete="new-password"
            required
          />
        </div>

        {/* Validation / backend error */}
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
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>

        {/* Login link */}
        <p className="auth-field text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-medium
              text-brand-400
              transition-colors
              hover:text-brand-500
            "
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;