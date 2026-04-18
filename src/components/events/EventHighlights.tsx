"use client";

import { motion, type Variants } from "framer-motion";

export function EventHighlights() {
  const events = [
    {
      title: "Hackathons",
      intro: (
        <>
          <span className="text-foreground">
            Hackathons are the starting point of the TIC ecosystem.
          </span>{" "}
          These events bring together builders, developers, designers, and
          operators to collaborate and build solutions within a focused time
          frame.
        </>
      ),
      points: [
        "Validate ideas",
        "Build prototypes",
        "Experiment with new technologies",
        "Solve real problems",
      ],
      footer:
        "Hackathons help us discover individuals who are capable of execution and committed to building.",
    },
    {
      title: "Founder Conferences",
      intro: (
        <>
          <span className="text-foreground">
            Our conferences bring together founders, operators, mentors, and
            industry leaders.
          </span>{" "}
          The goal of these events is to facilitate meaningful conversations
          around building companies.
        </>
      ),
      points: [
        "Founder journeys and lessons",
        "Startup strategy discussions",
        "Product development insights",
        "Growth and scaling conversations",
      ],
      footer:
        "These events allow founders to learn from real experiences while building valuable relationships within the ecosystem.",
    },
    {
      title: "Investor Connect Hackathons",
      intro: (
        <>
          <span className="text-foreground">
            Investor Connect Hackathons are designed for founders who are ready
            to take their startups to the next stage.
          </span>{" "}
          These events provide selected teams with the opportunity to present
          their ideas to investors, mentors, and experienced operators.
        </>
      ),
      points: [
        "Receiving feedback from experienced builders",
        "Improving product and business models",
        "Creating opportunities for investment discussions",
      ],
      footer: "",
    },
  ];

  const blockVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-background relative w-full px-6 py-24 md:py-32 lg:px-24">
      <div className="z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-32">
        {events.map((event, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={event.title}
              variants={blockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`flex w-full flex-col items-center justify-between gap-16 lg:flex-row lg:gap-24 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              {/* Content Side */}
              <div className="flex w-full flex-col items-start px-2 lg:w-5/12">
                <span className="text-foreground/40 mb-6 text-[10px] font-medium tracking-widest uppercase">
                  0{idx + 1} {"//"} Event Type
                </span>
                <h2 className="font-heading text-foreground mb-8 text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl">
                  {event.title}
                </h2>
                <p className="text-foreground/60 mb-10 font-sans text-xl leading-relaxed font-light md:text-2xl">
                  {event.intro}
                </p>
                {event.footer && (
                  <div className="bg-foreground/[0.02] border-foreground/10 relative rounded-[1.5rem] border p-6 md:p-8">
                    <div className="from-foreground/40 absolute top-0 bottom-0 left-0 w-1 rounded-l-[1.5rem] bg-gradient-to-b to-transparent" />
                    <p className="text-foreground/80 font-sans text-base italic">
                      &quot;{event.footer}&quot;
                    </p>
                  </div>
                )}
              </div>

              {/* Features Side (Bento-ish Grid) */}
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-6/12">
                {event.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-foreground/[0.02] border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.04] group relative flex min-h-[160px] flex-col justify-center overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 lg:p-10"
                  >
                    <div className="from-foreground/[0.03] pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="border-foreground/20 mb-6 flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-500 group-hover:scale-110">
                      <span className="text-foreground/50 font-sans text-[10px]">
                        ✦
                      </span>
                    </div>
                    <h3 className="font-heading text-foreground/80 group-hover:text-foreground text-xl leading-snug transition-colors">
                      {point}
                    </h3>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
