"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// import { useState } from "react";
// import { ApplicationModal } from "./ApplicationModal";

export function Hero() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Theme Toggle Button positioned top right */}

      {/* Dark mode background subtle glow */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] opacity-80" />
      </div>

      <div className="z-10 flex flex-col items-center px-4 text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-foreground mb-6 text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl"
        >
          The Incite Crew
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground/80 mb-10 max-w-xl font-sans text-lg leading-snug font-medium md:text-[20px]"
        >
          YOUR UNFAIR ADVANTAGE
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/membership"
            className="group border-foreground/10 bg-foreground/5 text-foreground hover:bg-foreground/10 hover:border-foreground/30 relative inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3 text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_0_rgba(255,255,255,0.15)] dark:border-white/10 dark:bg-white/5 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:shadow-[0_0_30px_0_rgba(255,255,255,0.15)]"
          >
            <span>Apply For Membership</span>
          </Link>
          {/* <ApplicationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    /> */}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6"
        >
          <p className="text-foreground/50 text-[10px] tracking-wide md:text-xs">
            Curated for serious founders
          </p>
        </motion.div>
      </div>
    </section>
  );
}
