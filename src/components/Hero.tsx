"use client";

import { motion } from "framer-motion";

export function Hero() {

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent">
            {/* Theme Toggle Button positioned top right */}


            {/* Dark mode background subtle glow */}
            <div className="pointer-events-none absolute inset-0 hidden dark:block">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] opacity-80" />
            </div>

            <div className="z-10 flex flex-col items-center text-center px-4">
                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight text-foreground mb-6"
                >
                    The Incite Crew
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-xl text-lg md:text-xl text-foreground/80 mb-10 leading-snug font-sans font-medium"
                >
                    A clarity first ecosystem helping founders make
                    <br className="hidden md:block" /> better decisions and execute with intent.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <button className="group relative inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-foreground/90 dark:bg-transparent dark:text-foreground dark:border-2 dark:border-white/30 dark:hover:bg-white/10 dark:hover:border-white/60">
                        Apply for membership
                    </button>
                </motion.div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-6"
                >
                    <p className="text-[10px] md:text-xs text-foreground/50 tracking-wide">
                        Curated for serious founders .
                    </p>
                </motion.div>
            </div>


        </section>
    );
}
