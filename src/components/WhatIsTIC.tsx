"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

const cardSlides = [
    {
        tag: "01",
        label: "Clarity",
        headline: "Clarity before speed.",
        body: "Remove confusion first. Define the right problem before moving.",
    },
    {
        tag: "02",
        label: "Structure",
        headline: "Structure before scale.",
        body: "Build a solid foundation. Plan the year deliberately.",
    },
    {
        tag: "03",
        label: "Execution",
        headline: "Execute with intent.",
        body: "Move only after decisions are crystal clear. No noise.",
    },
    {
        tag: "04",
        label: "Access",
        headline: "Refined & selective.",
        body: "Built for founders building real companies — not idea-stage exploration.",
    },
];

const pillars = [
    { number: "01", title: "Define the problem", sub: "Stop second-guessing. Identify what actually matters." },
    { number: "02", title: "Plan the year", sub: "Deliberate planning before execution begins." },
    { number: "03", title: "Execute without noise", sub: "Remove distraction and move with precision." },
];

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
};

export function WhatIsTIC() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [activeSlide, setActiveSlide] = useState(0);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    // Auto-advance card every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % cardSlides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-28 px-6 md:px-16 lg:px-24 overflow-hidden"
        >
            {/* Background accent — very subtle sweep on dark mode */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            <div className="w-full max-w-7xl mx-auto">

                {/* ── HEADER ROW ── */}
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUpVariant}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-foreground/10 pb-10"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-foreground max-w-lg leading-[1.1]">
                        What is<br />The Incite Crew?
                    </h2>
                    <p className="font-sans text-sm md:text-base text-foreground/60 max-w-xs leading-relaxed self-end">
                        A clarity-first founder ecosystem. Built to help you think clearly,
                        plan deliberately, and execute with intent.
                    </p>
                </motion.div>

                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">

                    {/* LEFT — THREE PILLARS */}
                    <div className="flex flex-col gap-0">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.number}
                                custom={i + 1}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={fadeUpVariant}
                                className="group flex items-start gap-6 py-7 border-b border-foreground/10 cursor-default transition-colors hover:border-foreground/30"
                            >
                                {/* Number tag */}
                                <span className="font-sans text-xs text-foreground/30 group-hover:text-foreground/60 transition-colors pt-1 tabular-nums w-6 shrink-0">
                                    {pillar.number}
                                </span>

                                {/* Content */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                                    <h3 className="font-heading text-xl md:text-2xl text-foreground group-hover:translate-x-1 transition-transform duration-300">
                                        {pillar.title}
                                    </h3>
                                    <p className="font-sans text-sm text-foreground/50 max-w-xs leading-relaxed md:text-right">
                                        {pillar.sub}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <span className="text-foreground/20 group-hover:text-foreground/50 group-hover:translate-x-1 transition-all duration-300 hidden md:block pt-1">
                                    →
                                </span>
                            </motion.div>
                        ))}

                        {/* Out-of-the-box: a small pull-quote row  */}
                        <motion.div
                            custom={pillars.length + 1}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={fadeUpVariant}
                            className="mt-12 flex items-center gap-4"
                        >
                            <div className="h-px flex-1 bg-foreground/10" />
                            <p className="font-sans text-xs text-foreground/40 italic">
                                &quot;We don&apos;t help you work harder. We help you think better.&quot;
                            </p>
                            <div className="h-px flex-1 bg-foreground/10" />
                        </motion.div>
                    </div>

                    {/* RIGHT — AUTO-SWIPING GLOWING CARD */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative flex flex-col gap-4 sticky top-24"
                    >
                        {/* Card */}
                        <div
                            className="relative w-full aspect-square rounded-[2.5rem] p-[1.5px] overflow-hidden"
                            style={{
                                background: !mounted
                                    ? "rgba(255,255,255,0.05)"
                                    : isDark
                                        ? "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.12) 100%)"
                                        : "linear-gradient(145deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.08) 100%)",
                                boxShadow: !mounted
                                    ? "none"
                                    : isDark
                                        ? "0 0 60px rgba(255,255,255,0.04)"
                                        : "0 0 40px rgba(0,0,0,0.06)",
                            }}
                        >
                            <div className={`relative w-full h-full rounded-[2.4rem] backdrop-blur-xl overflow-hidden flex flex-col justify-between p-8 transition-colors duration-500 border ${isDark ? "bg-black/85 border-white/5" : "bg-foreground/[0.03] border-foreground/10"
                                }`}>

                                {/* Slide tag — top left */}
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={activeSlide + "-tag"}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.3 }}
                                        className={`font-sans text-xs tabular-nums ${isDark ? "text-white/30" : "text-black/30"
                                            }`}
                                    >
                                        {cardSlides[activeSlide]?.tag} / {String(cardSlides.length).padStart(2, "0")}
                                    </motion.span>
                                </AnimatePresence>

                                {/* Main slide content — centered */}
                                <div className="flex flex-col gap-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeSlide}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16 }}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                        >
                                            <p className={`font-sans text-xs tracking-widest uppercase mb-3 ${isDark ? "text-white/40" : "text-black/40"
                                                }`}>
                                                {cardSlides[activeSlide]?.label}
                                            </p>
                                            <h3 className={`font-heading text-2xl md:text-3xl leading-tight mb-4 ${isDark ? "text-white" : "text-black"
                                                }`}>
                                                {cardSlides[activeSlide]?.headline}
                                            </h3>
                                            <p className={`font-sans text-sm leading-relaxed max-w-[240px] ${isDark ? "text-white/50" : "text-black/50"
                                                }`}>
                                                {cardSlides[activeSlide]?.body}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Progress dots + bar at bottom */}
                                <div className="flex flex-col gap-3">
                                    {/* Thin progress bar */}
                                    <div className={`h-px w-full rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-black/10"
                                        }`}>
                                        <motion.div
                                            key={activeSlide}
                                            className={`h-full rounded-full ${isDark ? "bg-white/60" : "bg-black/60"
                                                }`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 3, ease: "linear" }}
                                        />
                                    </div>
                                    {/* Dots */}
                                    <div className="flex gap-2">
                                        {cardSlides.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveSlide(i)}
                                                className={`rounded-full transition-all duration-300 ${i === activeSlide
                                                    ? `w-6 h-1.5 ${isDark ? "bg-white/80" : "bg-black/80"}`
                                                    : `w-1.5 h-1.5 ${isDark ? "bg-white/25" : "bg-black/25 hover:bg-black/50"}`
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small label below card */}
                        <p className="font-sans text-xs text-foreground/35 text-center tracking-wide">
                            Curated. Controlled. Intentional.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
