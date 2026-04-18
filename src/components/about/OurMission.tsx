"use client";

import { motion } from "framer-motion";

export function OurMission() {
  return (
    <section className="bg-foreground/[0.01] relative w-full overflow-hidden px-6 py-32 md:px-16 lg:px-24">
      {/* Subtle grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

      <div className="z-10 mx-auto flex w-full max-w-[1400px] flex-col items-start">
        <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Sticky left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full"
          >
            <div className="sticky top-32">
              <h2 className="font-heading text-foreground text-4xl font-medium tracking-tight md:text-5xl lg:text-7xl">
                Our Mission.
              </h2>
            </div>
          </motion.div>

          {/* Scrolling narrative right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-12 lg:space-y-16"
          >
            <p className="text-foreground font-heading text-3xl leading-snug tracking-tight md:text-4xl">
              Our mission is to help ambitious builders transform ideas into
              companies.
            </p>
            <p className="text-foreground/50 font-sans text-xl leading-relaxed font-light tracking-wide md:text-2xl">
              Starting a startup is often chaotic and uncertain. Many founders
              struggle with direction, access to mentors, and the right network.
              TIC exists to bridge that gap by creating an environment where
              founders can learn, collaborate, and build with the right support
              system around them.
            </p>
            <div className="bg-foreground/[0.03] border-foreground/10 relative overflow-hidden rounded-3xl border p-8 md:p-10">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[rgba(212,175,55,0.4)] to-transparent" />
              <p className="text-foreground/90 font-heading relative z-10 text-2xl leading-relaxed md:text-3xl">
                We believe strong startups emerge when talented individuals are
                placed in the right environments with the right people.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-32 flex w-full justify-center self-center pb-8"
        >
          <p className="text-foreground/30 flex items-center gap-4 text-center text-[10px] tracking-[0.4em] uppercase md:text-xs">
            <span className="bg-foreground/20 h-px w-8" />
            Curated for serious founders
            <span className="bg-foreground/20 h-px w-8" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
