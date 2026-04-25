"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Large diffuse center glow */}
        <div
          className="absolute h-[400px] w-[700px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(120,100,200,0.35) 0%, rgba(80,60,160,0.10) 50%, transparent 80%)",
            filter: "blur(60px)",
          }}
        />
        {/* Warm accent */}
        <div
          className="absolute h-[300px] w-[400px] translate-x-32 -translate-y-10 rounded-full opacity-20 dark:opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.30) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Top separator with fade */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="via-foreground/15 mb-20 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-foreground/40 font-sans text-xs tracking-[0.3em] uppercase"
        >
          Applications are reviewed before access is granted
        </motion.p>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          className="font-heading text-foreground text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Apply with{" "}
          <span className="font-heading text-foreground/50 italic">
            intent.
          </span>
        </motion.h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          className="text-foreground/50 max-w-md font-sans text-sm leading-relaxed md:text-base"
        >
          The Incite Crew is selective. We review every application and accept
          only those where TIC is the right fit. Not every application will be
          accepted.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
        >
          <Link
            href="/apply"
            className="group bg-foreground hover:bg-foreground/90 dark:text-foreground inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white transition-all hover:scale-105 dark:border-2 dark:border-white/30 dark:bg-transparent dark:hover:border-white/60 dark:hover:bg-white/10"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-foreground/25 font-sans text-xs"
        >
          Explorer · Visionary · Trailblazer
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t to-transparent" />
    </section>
  );
}
