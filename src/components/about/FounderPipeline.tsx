"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function FounderPipeline() {
  const pipelineSteps = [
    {
      id: "01",
      title: "Hackathon",
      desc: "Builders participate in hackathons where they collaborate, test ideas, and build prototypes.",
    },
    {
      id: "02",
      title: "Community",
      desc: "Participants who show strong potential become part of the TIC founder community where they gain access to discussions, mentorship, and learning opportunities.",
    },
    {
      id: "03",
      title: "Conference",
      desc: "Our conferences bring founders, operators, and industry leaders together to share insights, build relationships, and strengthen the ecosystem.",
    },
    {
      id: "04",
      title: "Investor Connect",
      desc: "Selected founders gain the opportunity to present their ideas to investors and mentors through curated events and programs.",
    },
    {
      id: "05",
      title: "Trailblazer",
      desc: "The most committed founders become part of the Trailblazer program where they gain deeper support, strategic guidance, and stronger ecosystem connections.",
    },
  ];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0); // Initialize with first one active

  return (
    <section className="relative w-full overflow-hidden bg-transparent px-6 py-32 md:px-16 lg:px-24">
      {/* Soft background grid or glow */}
      <div className="via-foreground/5 pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent blur-[100px]" />

      <div className="z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-center text-center md:mb-24"
        >
          <span className="border-foreground/10 bg-foreground/5 text-foreground/70 mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] tracking-widest uppercase backdrop-blur-md">
            The Pipeline
          </span>
          <h2 className="font-heading text-foreground text-4xl font-medium tracking-tight md:text-5xl lg:text-7xl">
            Founder Pathway
          </h2>
        </motion.div>

        {/* Horizontal Interactive layout */}
        <div className="relative w-full">
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-2 xl:justify-center">
            {pipelineSteps.map((step, idx) => {
              const isActive = hoveredIdx === idx;

              return (
                <motion.div
                  key={step.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onTouchStart={() => setHoveredIdx(idx)}
                  layout
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border p-8 transition-all duration-700 md:p-10 ${
                    isActive
                      ? "bg-foreground/[0.04] border-[rgba(212,175,55,0.3)] lg:flex-[2.5] lg:-translate-y-4"
                      : "bg-foreground/[0.01] border-foreground/10 hover:bg-foreground/[0.02] lg:flex-[1]"
                  } `}
                  style={{
                    minHeight: "400px",
                  }}
                >
                  {/* Active Glow Layer */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.1)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15)_0%,transparent_60%)]"
                    />
                  )}

                  <div className="relative z-10 flex h-full w-full flex-col justify-between lg:min-w-[200px]">
                    <div className="flex w-full items-start justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border font-sans text-sm tracking-widest transition-colors duration-500 ${isActive ? "border-transparent bg-black text-white dark:bg-white dark:text-black" : "border-foreground/20 text-foreground/50"}`}
                      >
                        {step.id}
                      </div>

                      {/* Step Connector Indicator */}
                      {/* {isPast && (
                                                <div className="hidden lg:flex items-center text-[10px] text-foreground/30 uppercase tracking-widest">
                                                    Passed
                                                </div>
                                            )} */}
                    </div>

                    <div className="mt-auto">
                      <h3
                        className={`font-heading mb-4 transition-all duration-500 ${isActive ? "text-foreground text-4xl" : "text-foreground/60 text-2xl"}`}
                      >
                        {step.title}
                      </h3>

                      <div
                        className={`w-full max-w-sm overflow-hidden transition-all duration-700 ${isActive ? "max-h-40 opacity-100" : "max-h-40 opacity-50 lg:max-h-0 lg:opacity-0"}`}
                      >
                        <p className="text-foreground/70 font-sans text-base leading-relaxed font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
