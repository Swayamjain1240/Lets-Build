import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import LandingNetworkScene
  from "../three/LandingNetworkScene";


const AuthLayout = ({
  children,
  title,
  description,
}) => {
  return (
    <main
      className="
        grid
        min-h-screen
        bg-background
        lg:grid-cols-2
      "
    >
      <section
        className="
          relative
          hidden
          overflow-hidden
          border-r
          border-border-soft
          lg:flex
          lg:flex-col
          lg:justify-between
          lg:p-10
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-50
          "
        >
          <LandingNetworkScene />
        </div>


        <Link
          to="/"
          className="
            relative
            z-10
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-brand-500
              text-sm
              font-bold
              text-white
            "
          >
            L
          </div>

          <span
            className="
              font-bold
              text-heading
            "
          >
            Let's Build
          </span>
        </Link>


        <div
          className="
            relative
            z-10
            max-w-md
          "
        >
          <p
            className="
              mb-3
              text-sm
              font-medium
              text-brand-400
            "
          >
            Build with the right people
          </p>

          <h2
            className="
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-heading
            "
          >
            Great products rarely start with one
            person.
          </h2>

          <p
            className="
              mt-5
              leading-7
              text-muted
            "
          >
            Discover developers, find matching
            opportunities and create teams around
            meaningful ideas.
          </p>
        </div>


        <p
          className="
            relative
            z-10
            text-xs
            text-muted
          "
        >
          Developer collaboration platform
        </p>
      </section>


      <section
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-5
          py-12
          sm:px-8
        "
      >
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              text-sm
              text-muted
              transition-colors
              hover:text-heading
            "
          >
            <ArrowLeft size={16} />

            Back to home
          </Link>


          <div className="mb-8">
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-heading
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-muted
              "
            >
              {description}
            </p>
          </div>


          {children}
        </div>
      </section>
    </main>
  );
};


export default AuthLayout;