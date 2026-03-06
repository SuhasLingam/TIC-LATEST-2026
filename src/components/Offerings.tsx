"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const tiers = [
    {
        id: "explorer",
        tag: null as string | null,
        name: "Explorer",
        tagline: "Foundation & Clarity",
        description:
            "For early-stage founders who need structure before scale. Self-serve, built for independent momentum.",
        features: [
            "Explorer Foundation Manual (20-page clarity doc)",
            "Monthly Strategy Session — 30 min, focused",
            "R&D Lite Insights monthly",
            "Messaging & Positioning Reset",
            "Content Direction Starter",
            "One Design Asset per Month",
            "Founder Dashboard Access",
        ],
        cta: "Apply for Explorer",
        glow: null as "gold" | "soft" | null,
    },
    {
        id: "visionary",
        tag: "Limited Membership" as string | null,
        name: "Visionary",
        tagline: "Brand & Growth System",
        description:
            "Deep execution support for founders ready to professionalize their brand and build a high-output growth engine.",
        features: [
            "Brand Architecture & Narrative System",
            "Content Engine — consistent messaging that drives growth",
            "Offer & Funnel Structuring",
            "4–6 Custom Design Assets per month",
            "Full Monthly R&D Reports & Audience Intelligence",
            "1:1 Strategy Sessions",
            "Priority Support",
            "Custom Execution Roadmap",
            "Quarterly Business Reviews",
        ],
        cta: "Apply for Visionary",
        glow: "soft" as "gold" | "soft" | null,
    },
    {
        id: "trailblazer",
        tag: "VIP · Invite Only" as string | null,
        name: "Trailblazer",
        tagline: "Strategic Partnership",
        description:
            "For operators, leaders and teams where execution quality and discretion matter at every level. Full partnership, bespoke to you.",
        features: [
            "Dedicated Strategic Partnership",
            "Custom Strategic Roadmapping",
            "Deep-Dive R&D & Intelligence",
            "Executive-Level Consulting",
            "Custom Brand & Narrative Systems",
            "High-Touch Execution Oversight",
            "Unlimited Design & Strategy Support",
            "Private Dashboard & Priority Access",
            "Full Discretion & Confidentiality",
        ],
        cta: "Request Access",
        glow: "gold" as "gold" | "soft" | null,
    },
];

const containerVariant: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.75, ease: "easeOut" },
    },
};

export function Offerings() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
        >
            {/* Subtle center glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-[600px] h-[400px] rounded-full blur-[140px] bg-foreground/5" />
            </div>

            <div className="relative w-full max-w-6xl mx-auto">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <p className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/45 mb-4">
                        Membership Tiers
                    </p>
                    <h2 className="font-heading text-5xl md:text-6xl font-medium tracking-tight text-foreground mb-5">
                        Our Offerings
                    </h2>
                    <p className="font-sans text-sm md:text-base text-foreground/55 max-w-sm mx-auto">
                        Curated access. Structured execution. Enduring momentum.
                    </p>
                </motion.div>

                {/* ── CARDS ── */}
                <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {tiers.map((tier) => (
                        <motion.div key={tier.id} variants={cardVariant} className="relative">

                            {/* Gold glow border — Trailblazer only */}
                            {tier.glow === "gold" && (
                                <div
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    style={{
                                        boxShadow: "0 0 0 1px rgba(212,175,55,0.55), 0 0 50px 8px rgba(212,175,55,0.10)",
                                        borderRadius: "1rem",
                                    }}
                                />
                            )}

                            {/* Soft neutral glow — Visionary */}
                            {tier.glow === "soft" && (
                                <div
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    style={{
                                        boxShadow: "0 0 0 1px rgba(150,150,170,0.25), 0 0 30px 4px rgba(150,150,170,0.06)",
                                        borderRadius: "1rem",
                                    }}
                                />
                            )}

                            {/* Card surface — theme-adaptive */}
                            <div
                                className={`relative flex flex-col h-full rounded-2xl p-6 overflow-hidden transition-all duration-300 ${tier.glow === "gold"
                                        ? "bg-foreground/[0.04] dark:bg-[#0e0e0e] border border-[rgba(212,175,55,0.30)]"
                                        : tier.glow === "soft"
                                            ? "bg-foreground/[0.03] dark:bg-foreground/[0.04] border border-foreground/15"
                                            : "bg-foreground/[0.02] border border-foreground/10 hover:border-foreground/20"
                                    }`}
                            >
                                {/* Tag */}
                                {tier.tag && (
                                    <span className="absolute top-5 right-5 font-sans text-[10px] tracking-widest uppercase text-foreground/40">
                                        {tier.tag}
                                    </span>
                                )}

                                {/* Name & tagline */}
                                <div className="mb-5">
                                    <h3 className="font-heading text-2xl md:text-3xl mb-1 text-foreground">
                                        {tier.name}
                                    </h3>
                                    <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/35">
                                        {tier.tagline}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="font-sans text-xs leading-relaxed mb-6 text-foreground/55">
                                    {tier.description}
                                </p>

                                {/* Feature list */}
                                <ul className="flex flex-col gap-2 mb-8 flex-1">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <Check
                                                className={`w-3 h-3 mt-0.5 shrink-0 ${tier.glow === "gold"
                                                        ? "text-[rgba(212,175,55,0.7)]"
                                                        : "text-foreground/35"
                                                    }`}
                                            />
                                            <span className="font-sans text-xs leading-relaxed text-foreground/60">
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    className={`w-full rounded-full py-2 font-sans text-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${tier.glow === "gold"
                                            ? "border border-[rgba(212,175,55,0.40)] text-foreground hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)]"
                                            : "border border-foreground/15 text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04]"
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Fine print */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center font-sans text-xs text-foreground/30 mt-10"
                >
                    Applications are reviewed before access is granted. Not every application will be accepted.
                </motion.p>
            </div>
        </section>
    );
}
