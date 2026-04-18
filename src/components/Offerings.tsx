"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
// import { ApplicationModal } from "./ApplicationModal";
import { OnboardingModal } from "./OnboardingModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<
    "Explorer" | "Visionary" | "Trailblazer" | undefined
  >(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      {/* Subtle center glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-foreground/5 h-[400px] w-[600px] rounded-full blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p className="text-foreground/45 mb-4 font-sans text-xs tracking-[0.25em] uppercase">
            Membership Tiers
          </p>
          <h2 className="font-heading text-foreground mb-5 text-5xl font-medium tracking-tight md:text-6xl">
            Our Offerings
          </h2>
          <p className="text-foreground/55 mx-auto max-w-sm font-sans text-sm md:text-base">
            Curated access. Structured execution. Enduring momentum.
          </p>
        </motion.div>

        {/* ── CARDS ── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariant}
              className="relative"
            >
              {/* Gold glow border — Trailblazer only */}
              {tier.glow === "gold" && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(212,175,55,0.55), 0 0 50px 8px rgba(212,175,55,0.10)",
                    borderRadius: "1rem",
                  }}
                />
              )}

              {/* Soft neutral glow — Visionary */}
              {tier.glow === "soft" && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(150,150,170,0.25), 0 0 30px 4px rgba(150,150,170,0.06)",
                    borderRadius: "1rem",
                  }}
                />
              )}

              {/* Card surface — theme-adaptive */}
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                  tier.glow === "gold"
                    ? "bg-foreground/[0.04] border border-[rgba(212,175,55,0.30)] dark:bg-[#0e0e0e]"
                    : tier.glow === "soft"
                      ? "bg-foreground/[0.03] dark:bg-foreground/[0.04] border-foreground/15 border"
                      : "bg-foreground/[0.02] border-foreground/10 hover:border-foreground/20 border"
                }`}
              >
                {/* Tag */}
                {tier.tag && (
                  <span className="text-foreground/40 absolute top-5 right-5 font-sans text-[10px] tracking-widest uppercase">
                    {tier.tag}
                  </span>
                )}

                {/* Name & tagline */}
                <div className="mb-5">
                  <h3 className="font-heading text-foreground mb-1 text-2xl md:text-3xl">
                    {tier.name}
                  </h3>
                  <p className="text-foreground/35 font-sans text-[10px] tracking-widest uppercase">
                    {tier.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-foreground/55 mb-6 font-sans text-xs leading-relaxed">
                  {tier.description}
                </p>

                {/* Feature list */}
                <ul className="mb-8 flex flex-1 flex-col gap-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        className={`mt-0.5 h-3 w-3 shrink-0 ${
                          tier.glow === "gold"
                            ? "text-[rgba(212,175,55,0.7)]"
                            : "text-foreground/35"
                        }`}
                      />
                      <span className="text-foreground/60 font-sans text-xs leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedTier(
                      tier.name as "Explorer" | "Visionary" | "Trailblazer",
                    );
                    setIsModalOpen(true);
                  }}
                  className={`w-full rounded-full py-2 font-sans text-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    tier.glow === "gold"
                      ? "text-foreground border border-[rgba(212,175,55,0.40)] hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)]"
                      : "border-foreground/15 text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] border"
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
          className="text-foreground/30 mt-10 text-center font-sans text-xs"
        >
          Applications are reviewed before access is granted. Not every
          application will be accepted.
        </motion.p>

        {/* Legacy Application form skipped in favor of Onboarding flow */}
        {/* <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    tier={selectedTier}
                /> */}

        <OnboardingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tier={selectedTier}
        />
      </div>
    </section>
  );
}
