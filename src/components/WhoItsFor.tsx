"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

const personas = [
    {
        number: "01",
        title: "Building real companies",
        description:
            "Not testing an idea. Not exploring a concept. You're actively building a company — and you're committed to doing it with intent and structure.",
        tags: ["Real company", "Full commitment", "Not idea-stage"],
    },
    {
        number: "02",
        title: "Want structure over motivation",
        description:
            "You're done with hype, shortcuts, and generic advice. You need a system — structured frameworks and planning tools that help you run the year deliberately.",
        tags: ["Structure-first", "System-driven", "No hype"],
    },
    {
        number: "03",
        title: "Value clear thinking over constant advice",
        description:
            "You don't want more opinions. You want clarity. The ability to define the right problem, plan with precision, and execute without noise or distraction.",
        tags: ["Clarity-first", "Self-directed", "Decisive"],
    },
];

// const notFor = [
//     "Idea-stage exploration",
//     "Passive consumption",
// ];

const rowVariant: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.12, ease: "easeOut" },
    }),
};

export function WhoItsFor() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-28 px-6 md:px-16 lg:px-24 overflow-hidden"
        >
            <div className="w-full max-w-7xl mx-auto">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-10 border-b border-foreground/10"
                >
                    <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
                        Who It&apos;s For?
                    </h2>
                    <p className="font-sans text-sm text-foreground/50 max-w-xs leading-relaxed md:text-right self-end">
                        Built for those who build. Not for everyone.
                    </p>
                </motion.div>

                {/* ── PERSONA ROWS ── */}
                <div className="flex flex-col divide-y divide-foreground/10">
                    {personas.map((persona, i) => (
                        <motion.div
                            key={persona.number}
                            custom={i}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={rowVariant}
                            className="group grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 items-start py-8 cursor-default"
                        >
                            {/* Number */}
                            <span className="font-sans text-xs text-foreground/25 group-hover:text-foreground/50 transition-colors tabular-nums pt-1">
                                {persona.number}
                            </span>

                            {/* Title + Description */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-heading text-2xl md:text-3xl text-foreground group-hover:translate-x-1 transition-transform duration-300">
                                    {persona.title}
                                </h3>
                                <p className="font-sans text-sm text-foreground/55 leading-relaxed max-w-xl">
                                    {persona.description}
                                </p>
                            </div>

                            {/* Tags — right column, desktop only */}
                            <div className="hidden md:flex flex-col gap-2 pt-1 items-end">
                                {persona.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-sans text-[11px] tracking-wide text-foreground/35 border border-foreground/10 rounded-full px-3 py-1 group-hover:border-foreground/25 group-hover:text-foreground/55 transition-all"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── NOT FOR BLOCK ── */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.45, ease: "easeOut" }}
                    className="mt-16 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 flex flex-col md:flex-row md:items-center gap-8"
                >
                    <div className="shrink-0">
                        <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-foreground/35 mb-1">
                            Not for
                        </p>
                        <p className="font-heading text-xl text-foreground/60">
                            This isn&apos;t for everyone.
                        </p>
                    </div>

                    <div className="h-px w-full md:h-10 md:w-px bg-foreground/10 shrink-0" />

                    <div className="flex flex-wrap gap-3">
                        {notFor.map((item) => (
                            <span
                                key={item}
                                className="font-sans text-xs text-foreground/40 border border-foreground/10 rounded-full px-4 py-1.5"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}
