import { useRef } from "react";
import { Link } from "react-router-dom";

import AuthLayout
  from "../../layouts/AuthLayout.jsx";

import Input
  from "../../components/common/Input.jsx";

import Button
  from "../../components/common/Button.jsx";

import {
  gsap,
  useGSAP,
} from "../../lib/gsap.js";


const Login = () => {
  const formRef = useRef(null);


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
    {
      scope: formRef,
    }
  );


  const handleSubmit = (event) => {
    event.preventDefault();

    // Part 3:
    // connect this form with authService/login API.
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
        <div className="auth-field">
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>


        <div className="auth-field">
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>


        <div className="auth-field">
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </div>


        <p
          className="
            auth-field
            text-center
            text-sm
            text-muted
          "
        >
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