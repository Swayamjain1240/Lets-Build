import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";


const PublicNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        border-b
        border-border-soft/70
        bg-background/75
        backdrop-blur-xl
      "
    >
      <nav
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-5
          lg:px-8
        "
      >
        <Link
          to="/"
          className="
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
              text-lg
              font-bold
              tracking-tight
              text-heading
            "
          >
            Let's Build
          </span>
        </Link>


        <div
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >
          <a
            href="#features"
            className="
              text-sm
              text-muted
              transition-colors
              hover:text-heading
            "
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="
              text-sm
              text-muted
              transition-colors
              hover:text-heading
            "
          >
            How it works
          </a>
        </div>


        <div
          className="
            hidden
            items-center
            gap-3
            md:flex
          "
        >
          <Link
            to="/login"
            className="
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              text-body
              transition-colors
              hover:text-heading
            "
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-brand-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-brand-600
            "
          >
            Get Started

            <ArrowRight size={15} />
          </Link>
        </div>


        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="
            rounded-lg
            border
            border-border
            p-2
            text-body
            md:hidden
          "
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </nav>


      {menuOpen && (
        <div
          className="
            border-t
            border-border
            bg-background
            px-5
            py-5
            md:hidden
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
            "
          >
            <a
              href="#features"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-body"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-body"
            >
              How it works
            </a>

            <Link
              to="/login"
              className="text-body"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                rounded-xl
                bg-brand-500
                px-4
                py-3
                text-center
                font-semibold
                text-white
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};


export default PublicNavbar;