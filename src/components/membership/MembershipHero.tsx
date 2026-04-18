"use client";

import { motion } from "framer-motion";
export function MembershipHero() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:px-16 lg:px-24">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] blur-[100px]" />

      <div className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-foreground mb-12 text-5xl leading-[1.05] font-medium tracking-tight md:text-7xl lg:text-[6.5rem]"
        >
          Join the <br className="hidden md:block" />
          <span className="text-foreground/40 italic">Builder</span> Network
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground/60 mb-12 max-w-3xl space-y-6 font-sans text-lg leading-relaxed font-light md:text-xl"
        >
          <p>
            Membership at The Incite Crew is designed for founders who want to
            build serious companies and surround themselves with others who
            share the same ambition.
          </p>
          <p>
            TIC membership is structured into three tiers designed to support
            founders at different stages of their journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 md:bottom-0"
        >
          <span className="text-foreground/40 text-[10px] font-medium tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="bg-foreground/10 relative h-16 w-[1.5px] overflow-hidden rounded-full">
            <motion.div
              className="bg-foreground/50 absolute top-0 left-0 h-[15px] w-full rounded-full"
              animate={{ y: [-15, 64] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatDelay: 0.2,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
