"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

const steps = [
    {
        number: "01",
        title: "Apply",
        tagline: "Your intention signals your seriousness.",
        description:
            "Submit your application. We review every founder personally before granting access. This isn't automated — it's deliberate.",
    },
    {
        number: "02",
        title: "Get Access",
        tagline: "You're placed at the right tier.",
        description:
            "Once approved, you're onboarded into the right level — Explorer or Visionary — based on where you are and where you're going.",
    },
    {
        number: "03",
        title: "Execute",
        tagline: "Clarity turns into action.",
        description:
            "Use structured frameworks and planning systems to run the year with precision. Clear thinking. Deliberate planning. No noise.",
    },
];

const containerVariant: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const circleVariant: Variants = {
    hidden: { opacity: 0, scale: 0.75, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [active, setActive] = useState(0);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = mounted && resolvedTheme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-cycle every 3.5s
    useEffect(() => {
        const t = setInterval(() => {
            setActive((prev) => (prev + 1) % steps.length);
        }, 3500);
        return () => clearInterval(t);
    }, []);

    // Position of the traveling dot (0 = left circle, 1 = middle, 2 = right)
    const dotPositions = ["16.67%", "50%", "83.33%"];

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
        >


            <div className="relative w-full max-w-7xl mx-auto">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-24"
                >
                    <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground">
                        How It Works&nbsp;?
                    </h2>
                </motion.div>

                {/* ── CIRCLES ── */}
                <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative grid grid-cols-3"
                >
                    {/* Horizontal connector line — perfectly centered on circle centers across all screen sizes */}
                    <div className="absolute top-[56px] md:top-[80px] lg:top-[112px] left-[16.67%] right-[16.67%] h-px bg-foreground/12 pointer-events-none -translate-y-[0.5px]" />

                    {/* Traveling active dot on the line */}
                    <motion.div
                        className="absolute top-[56px] md:top-[80px] lg:top-[112px] w-1.5 h-1.5 rounded-full bg-foreground shadow-[0_0_8px_3px_rgba(0,0,0,0.25)] dark:shadow-[0_0_10px_4px_rgba(255,255,255,0.4)] pointer-events-none"
                        animate={{ left: dotPositions[active] }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        style={{ translateX: "-50%", translateY: "-50%" }}
                    />

                    {steps.map((step, i) => {
                        const isActive = active === i;
                        return (
                            <motion.div
                                key={step.number}
                                variants={circleVariant}
                                className="flex flex-col items-center"
                            >
                                {/* Circle button */}
                                <button
                                    onClick={() => setActive(i)}
                                    className="group relative focus:outline-none"
                                >
                                    {/* Cinematic multi-layer glow — active only */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <>
                                                {/* Outer diffuse */}
                                                <motion.div
                                                    key="glow-outer"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="absolute inset-[-20px] rounded-full pointer-events-none dark:block hidden"
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
                                                        filter: "blur(8px)",
                                                    }}
                                                />
                                                {/* Sharp border ring — adapts per theme */}
                                                <motion.div
                                                    key="glow-ring"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="absolute inset-0 rounded-full pointer-events-none"
                                                    style={{
                                                        boxShadow: !mounted
                                                            ? "none"
                                                            : isDark
                                                                ? "0 0 0 1.5px rgba(255,255,255,0.45), 0 0 40px 8px rgba(255,255,255,0.12), inset 0 0 30px 4px rgba(255,255,255,0.04)"
                                                                : "0 0 0 1.5px rgba(0,0,0,0.18), 0 0 24px 6px rgba(0,0,0,0.05)",
                                                    }}
                                                />
                                            </>
                                        )}
                                    </AnimatePresence>

                                    {/* Circle body */}
                                    <motion.div
                                        animate={{ scale: isActive ? 1.05 : 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`relative flex items-center justify-center rounded-full border w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 backdrop-blur-sm transition-colors duration-500 ${isActive
                                            ? "border-foreground/40 bg-foreground/5"
                                            : "border-foreground/10 bg-foreground/[0.02]"
                                            }`}
                                    >
                                        <motion.span
                                            animate={{
                                                opacity: isActive ? 1 : 0.35,
                                                scale: isActive ? 1 : 0.9,
                                            }}
                                            transition={{ duration: 0.4 }}
                                            className="font-heading text-2xl md:text-3xl lg:text-5xl text-foreground"
                                        >
                                            {step.number}
                                        </motion.span>
                                    </motion.div>
                                </button>

                                {/* Vertical drop line */}
                                <motion.div
                                    variants={{
                                        hidden: { scaleY: 0, originY: 0 },
                                        visible: {
                                            scaleY: 1,
                                            transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
                                        },
                                    }}
                                    className={`w-px h-16 md:h-24 bg-gradient-to-b ${isActive
                                        ? "from-foreground/50 to-transparent"
                                        : "from-foreground/15 to-transparent"
                                        } transition-colors duration-500`}
                                />

                                {/* Step info below line */}
                                <div className="flex flex-col items-center text-center gap-2 px-3 mt-1">
                                    <motion.span
                                        animate={{
                                            opacity: isActive ? 1 : 0.3,
                                            y: isActive ? 0 : 4,
                                        }}
                                        transition={{ duration: 0.4 }}
                                        className="font-heading text-lg md:text-xl text-foreground"
                                    >
                                        {step.title}
                                    </motion.span>

                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.p
                                                key="tagline"
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.35 }}
                                                className="font-sans text-xs text-foreground/45 italic max-w-[160px] leading-relaxed"
                                            >
                                                {step.tagline}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── DESCRIPTION STRIP ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center pt-10"
                >
                    {/* Step number + description */}
                    <div className="flex items-start gap-5">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={active + "-num"}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="font-heading text-5xl md:text-7xl text-foreground/10 leading-none shrink-0 select-none"
                            >
                                {steps[active]?.number}
                            </motion.span>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active + "-desc"}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col gap-1"
                            >
                                <span className="font-heading text-sm text-foreground/50 uppercase tracking-widest">
                                    {steps[active]?.title}
                                </span>
                                <p className="font-sans text-sm md:text-base text-foreground/65 leading-relaxed max-w-md">
                                    {steps[active]?.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Step progress dots */}
                    <div className="flex gap-2 items-center shrink-0">
                        {steps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`rounded-full transition-all duration-300 ${i === active
                                    ? "w-8 h-1.5 bg-foreground/70"
                                    : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
