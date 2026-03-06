"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function CTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
        >
            {/* ── AMBIENT BACKGROUND ── */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {/* Large diffuse center glow */}
                <div
                    className="absolute w-[700px] h-[400px] rounded-full opacity-30 dark:opacity-20"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(120,100,200,0.35) 0%, rgba(80,60,160,0.10) 50%, transparent 80%)",
                        filter: "blur(60px)",
                    }}
                />
                {/* Warm accent */}
                <div
                    className="absolute w-[400px] h-[300px] rounded-full opacity-20 dark:opacity-15 translate-x-32 -translate-y-10"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(212,175,55,0.30) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* Top separator with fade */}
            <div className="w-full max-w-7xl mx-auto">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent mb-20" />
            </div>

            {/* ── CONTENT ── */}
            <div className="relative w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-10">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-sans text-xs tracking-[0.3em] uppercase text-foreground/40"
                >
                    Applications are reviewed before access is granted
                </motion.p>

                {/* Main headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
                    className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-foreground leading-[1.05]"
                >
                    Apply with{" "}
                    <span className="italic font-heading text-foreground/50">intent.</span>
                </motion.h2>

                {/* Sub copy */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
                    className="font-sans text-sm md:text-base text-foreground/50 max-w-md leading-relaxed"
                >
                    The Incite Crew is selective. We review every application and accept
                    only those where TIC is the right fit. Not every application will be accepted.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
                >
                    <button className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-foreground/90 dark:bg-transparent dark:text-foreground dark:border-2 dark:border-white/30 dark:hover:bg-white/10 dark:hover:border-white/60">
                        Apply Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>

                {/* Fine print */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="font-sans text-xs text-foreground/25"
                >
                    Explorer · Visionary · Trailblazer
                </motion.p>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
