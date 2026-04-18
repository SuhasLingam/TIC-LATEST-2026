"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:px-16 lg:px-24">
      {/* Enhanced Background elements */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-[80px]" />

      <div className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-foreground mb-12 text-5xl leading-[1.08] font-medium tracking-tight md:text-7xl lg:text-[6rem]"
        >
          Building the Next <br />
          <span className="text-foreground/40">Generation</span> of Founders
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground/60 max-w-2xl font-sans text-lg leading-relaxed md:text-xl"
        >
          The Incite Crew (TIC) is a founder ecosystem built to help ambitious
          builders move from ideas to real companies. We focus on connecting
          early builders with mentorship, networks, and opportunities that
          accelerate execution.
        </motion.p>
      </div>
    </section>
  );
}
