import {ArrowRight,BrainCircuit,MessageSquare,Users,UserRoundSearch,CheckCircle2,} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

import PublicNavbar from "../../components/navbar/PublicNavbar.jsx"
import LandingNetworkScene from "../../three/LandingNetworkScene.jsx"

import {gsap , useGSAP} from "../../lib/gsap.js"


const features = [
  {
    icon: UserRoundSearch,
    title: "Discover Developers",
    description:
      "Find developers based on their skills, experience and collaboration interests.",
  },
  {
    icon: BrainCircuit,
    title: "AI Skill Matching",
    description:
      "Get intelligent project and developer recommendations based on skill compatibility.",
  },
  {
    icon: Users,
    title: "Build Your Team",
    description:
      "Send invitations, receive join requests and create the right team around your project.",
  },
  {
    icon: MessageSquare,
    title: "Collaborate in Real Time",
    description:
      "Connect with your teammates through realtime conversations and notifications.",
  },
];


const steps = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Add your skills, experience and developer profile.",
  },
  {
    number: "02",
    title: "Discover opportunities",
    description:
      "Explore developers and public recruitment opportunities.",
  },
  {
    number: "03",
    title: "Get AI recommendations",
    description:
      "Let the matching system identify relevant projects or developers.",
  },
  {
    number: "04",
    title: "Build together",
    description:
      "Form a team, communicate and turn ideas into working products.",
  },
];


const Landing = () => {
  const pageRef = useRef(null);


  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });


      timeline
        .from(".hero-badge", {
          opacity: 0,
          y: 14,
          duration: 0.55,
        })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 28,
            duration: 0.75,
          },
          "-=0.25"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
            duration: 0.65,
          },
          "-=0.4"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 18,
            duration: 0.6,
          },
          "-=0.35"
        );


      gsap.utils
        .toArray(".reveal-section")
        .forEach((section) => {
          gsap.from(section, {
            opacity: 0,
            y: 35,

            duration: 0.75,

            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              once: true,
            },
          });
        });


      gsap.from(".feature-card", {
        opacity: 0,
        y: 25,

        duration: 0.65,
        stagger: 0.08,

        ease: "power3.out",

        scrollTrigger: {
          trigger: "#features",
          start: "top 78%",
          once: true,
        },
      });
    },
    {
      scope: pageRef,
    }
  );


  return (
    <div
      ref={pageRef}
      className="
        min-h-screen
        overflow-hidden
        bg-background
      "
    >
      <PublicNavbar />


      {/* HERO */}

      <main>
        <section
          className="
            relative
            flex
            min-h-screen
            items-center
            overflow-hidden
            pt-16
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              h-[500px]
              w-[700px]
              -translate-x-1/2
              rounded-full
              bg-brand-500/10
              blur-[140px]
            "
          />


          <div
            className="
              absolute
              inset-y-0
              right-0
              hidden
              w-[52%]
              opacity-90
              lg:block
            "
          >
            <LandingNetworkScene />
          </div>


          <div
            className="
              relative
              z-10
              mx-auto
              grid
              w-full
              max-w-7xl
              items-center
              gap-10
              px-5
              py-24
              lg:grid-cols-2
              lg:px-8
            "
          >
            <div
              className="
                max-w-3xl
                text-center
                lg:text-left
              "
            >
              <div
                className="
                  hero-badge
                  mb-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-brand-500/20
                  bg-brand-500/5
                  px-3.5
                  py-1.5
                  text-xs
                  font-medium
                  text-brand-400
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-brand-400
                  "
                />

                Built for developers who build
              </div>


              <h1
                className="
                  hero-title
                  text-5xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.045em]
                  text-heading
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                Find the right people.

                <span
                  className="
                    mt-2
                    block
                    text-brand-400
                  "
                >
                  Build something real.
                </span>
              </h1>


              <p
                className="
                  hero-description
                  mx-auto
                  mt-7
                  max-w-xl
                  text-base
                  leading-7
                  text-muted
                  sm:text-lg
                  lg:mx-0
                "
              >
                Let's Build connects developers,
                projects and skills in one
                collaborative platform — with
                intelligent matching to help you
                find the right team.
              </p>


              <div
                className="
                  hero-actions
                  mt-9
                  flex
                  flex-col
                  items-center
                  gap-3
                  sm:flex-row
                  sm:justify-center
                  lg:justify-start
                "
              >
                <Link
                  to="/signup"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-brand-500
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-brand-600
                  "
                >
                  Start Building

                  <ArrowRight size={16} />
                </Link>


                <a
                  href="#how-it-works"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-border
                    bg-surface/70
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-body
                    transition-all
                    duration-200
                    hover:border-brand-500/30
                    hover:bg-surface-hover
                    hover:text-heading
                  "
                >
                  See how it works
                </a>
              </div>


              <div
                className="
                  mt-9
                  flex
                  flex-wrap
                  justify-center
                  gap-x-5
                  gap-y-2
                  text-xs
                  text-muted
                  lg:justify-start
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <CheckCircle2
                    size={14}
                    className="text-brand-400"
                  />

                  Skill-based discovery
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <CheckCircle2
                    size={14}
                    className="text-brand-400"
                  />

                  AI recommendations
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                  "
                >
                  <CheckCircle2
                    size={14}
                    className="text-brand-400"
                  />

                  Realtime collaboration
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* FEATURES */}

        <section
          id="features"
          className="
            reveal-section
            border-t
            border-border-soft
            py-24
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              px-5
              lg:px-8
            "
          >
            <div className="max-w-2xl">
              <p
                className="
                  mb-3
                  text-sm
                  font-semibold
                  text-brand-400
                "
              >
                Everything in one place
              </p>

              <h2
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-heading
                  sm:text-4xl
                "
              >
                From finding people to building
                together.
              </h2>

              <p
                className="
                  mt-4
                  leading-7
                  text-muted
                "
              >
                A focused workspace for discovering
                developers, building teams and
                collaborating around real projects.
              </p>
            </div>


            <div
              className="
                mt-12
                grid
                gap-4
                md:grid-cols-2
                lg:grid-cols-4
              "
            >
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="
                      feature-card
                      group
                      rounded-2xl
                      border
                      border-border
                      bg-surface
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-brand-500/25
                      hover:bg-surface-soft
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-brand-500/15
                        bg-brand-500/10
                        text-brand-400
                      "
                    >
                      <Icon size={19} />
                    </div>

                    <h3
                      className="
                        text-base
                        font-semibold
                        text-heading
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-muted
                      "
                    >
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>


        {/* HOW IT WORKS */}

        <section
          id="how-it-works"
          className="
            reveal-section
            border-t
            border-border-soft
            bg-surface/30
            py-24
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              px-5
              lg:px-8
            "
          >
            <div
              className="
                grid
                gap-14
                lg:grid-cols-[0.8fr_1.2fr]
              "
            >
              <div>
                <p
                  className="
                    mb-3
                    text-sm
                    font-semibold
                    text-brand-400
                  "
                >
                  Simple workflow
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-heading
                    sm:text-4xl
                  "
                >
                  Less searching.
                  <br />
                  More building.
                </h2>

                <p
                  className="
                    mt-5
                    max-w-md
                    leading-7
                    text-muted
                  "
                >
                  The platform keeps the workflow
                  focused from developer discovery
                  through team collaboration.
                </p>
              </div>


              <div>
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`
                      grid
                      grid-cols-[56px_1fr]
                      gap-4
                      py-6

                      ${
                        index !== steps.length - 1
                          ? "border-b border-border-soft"
                          : ""
                      }
                    `}
                  >
                    <span
                      className="
                        font-mono
                        text-sm
                        text-brand-400
                      "
                    >
                      {step.number}
                    </span>

                    <div>
                      <h3
                        className="
                          font-semibold
                          text-heading
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-muted
                        "
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}

        <section
          className="
            reveal-section
            border-t
            border-border-soft
            py-24
          "
        >
          <div
            className="
              mx-auto
              max-w-5xl
              px-5
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-surface
                px-6
                py-16
                text-center
                sm:px-12
              "
            >
              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-48
                  w-96
                  -translate-x-1/2
                  rounded-full
                  bg-brand-500/10
                  blur-[90px]
                "
              />

              <div className="relative">
                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-heading
                    sm:text-4xl
                  "
                >
                  Your next team could start here.
                </h2>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-xl
                    leading-7
                    text-muted
                  "
                >
                  Create your developer profile and
                  start discovering people worth
                  building with.
                </p>

                <Link
                  to="/signup"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-brand-500
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-brand-600
                  "
                >
                  Create your profile

                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>


      {/* FOOTER */}

      <footer
        className="
          border-t
          border-border-soft
          py-8
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-3
            px-5
            text-sm
            text-muted
            sm:flex-row
            lg:px-8
          "
        >
          <span className="font-semibold text-heading">
            Let's Build
          </span>

          <span>
            Built for developers who want to build.
          </span>
        </div>
      </footer>
    </div>
  );
};


export default Landing;