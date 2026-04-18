"use client";

import { motion } from "framer-motion";

export function MembershipGoal() {
  return (
    <section className="bg-foreground/[0.02] relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-32 md:px-16 lg:px-24">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[rgba(212,175,55,0.03)] to-transparent" />

      <div className="z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Sticky left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full"
          >
            <div className="sticky top-32">
              <h2 className="font-heading text-foreground text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl">
                The Goal of Membership.
              </h2>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-10 lg:space-y-16"
          >
            <p className="text-foreground font-heading text-3xl leading-snug tracking-tight md:text-4xl">
              The purpose of TIC membership is not simply networking.
            </p>
            <p className="text-foreground/60 font-sans text-xl leading-relaxed font-light tracking-wide md:text-2xl">
              It is about building a community where founders support each
              other, share insights, and gain access to opportunities that
              accelerate the journey from idea to company.
            </p>
            <div className="bg-background border-foreground/10 relative overflow-hidden rounded-3xl border p-8 shadow-2xl md:p-10">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[rgba(212,175,55,0.6)] to-[rgba(212,175,55,0.1)]" />
              <p className="text-foreground/90 font-heading relative z-10 text-2xl leading-relaxed italic md:text-3xl">
                &quot;TIC aims to create an environment where builders grow into
                founders and founders grow into successful companies.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
