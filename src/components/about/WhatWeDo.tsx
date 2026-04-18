"use client";

import { motion } from "framer-motion";

export function WhatWeDo() {
  const cards = [
    {
      title: "Discover Builders",
      desc: "We identify talented individuals through hackathons, workshops, and founder programs. These environments allow builders to test ideas, collaborate with others, and demonstrate their ability to execute.",
      className:
        "col-span-1 lg:col-span-2 min-h-[450px] bg-foreground/[0.04] border-[rgba(212,175,55,0.25)] shadow-[0_0_80px_rgba(212,175,55,0.05)] dark:shadow-[0_0_80px_rgba(212,175,55,0.03)] hover:border-[rgba(212,175,55,0.4)]",
      delay: 0.1,
    },
    {
      title: "Support Founders",
      desc: "Once builders show promise, we help them move forward through mentorship, structured programs, and strategic guidance.",
      className:
        "col-span-1 lg:col-span-1 min-h-[450px] bg-foreground/[0.015] border-foreground/10 hover:border-foreground/30",
      delay: 0.2,
    },
    {
      title: "Connect Opportunities",
      desc: "Startups need access to the right people. TIC connects founders with operators, mentors, and investors who can help them take the next step in their journey.",
      className:
        "col-span-1 lg:col-span-3 min-h-[350px] lg:min-h-[300px] bg-foreground/[0.02] border-foreground/10 hover:border-[rgba(150,150,170,0.25)] hover:bg-[rgba(150,150,170,0.02)]",
      delay: 0.3,
    },
  ];

  return (
    <section className="relative w-full px-6 py-32 md:px-16 lg:px-24">
      <div className="z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span className="border-foreground/10 bg-foreground/5 text-foreground/70 mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] tracking-widest uppercase backdrop-blur-md">
            The Process
          </span>
          <h2 className="font-heading text-foreground text-4xl font-medium tracking-tight md:text-5xl lg:text-7xl">
            Catalyzing <span className="text-foreground/40 italic">Growth</span>
          </h2>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: card.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              key={idx}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-10 transition-all duration-700 md:p-14 ${card.className}`}
            >
              {/* Subtle premium hover glow */}
              <div className="from-foreground/[0.04] pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <h3 className="font-heading text-foreground relative z-10 mb-8 max-w-sm text-3xl font-medium lg:text-4xl">
                {card.title}
              </h3>
              <p className="text-foreground/60 relative z-10 max-w-2xl font-sans text-lg leading-relaxed font-light lg:text-xl">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
