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


const Signup = () => {
  const formRef = useRef(null);


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
    {
      scope: formRef,
    }
  );


  const handleSubmit = (event) => {
    event.preventDefault();

    // Part 3:
    // validation + signup API.
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
        <div className="auth-field">
          <Input
            id="name"
            name="name"
            label="Full name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>


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
            placeholder="Minimum 6 characters"
            minLength={6}
            autoComplete="new-password"
            required
          />
        </div>


        <div className="auth-field">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Enter password again"
            autoComplete="new-password"
            required
          />
        </div>


        <div className="auth-field">
          <Button
            type="submit"
            className="w-full"
          >
            Create Account
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