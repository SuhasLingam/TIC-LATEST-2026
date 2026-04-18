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
      className="relative w-full overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="font-heading text-foreground text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
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
          <div className="bg-foreground/12 pointer-events-none absolute top-[56px] right-[16.67%] left-[16.67%] h-px -translate-y-[0.5px] md:top-[80px] lg:top-[112px]" />

          {/* Traveling active dot on the line */}
          <motion.div
            className="bg-foreground pointer-events-none absolute top-[56px] h-1.5 w-1.5 rounded-full shadow-[0_0_8px_3px_rgba(0,0,0,0.25)] md:top-[80px] lg:top-[112px] dark:shadow-[0_0_10px_4px_rgba(255,255,255,0.4)]"
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
                          className="pointer-events-none absolute inset-[-20px] hidden rounded-full dark:block"
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
                          className="pointer-events-none absolute inset-0 rounded-full"
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
                    className={`relative flex h-28 w-28 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-500 md:h-40 md:w-40 lg:h-56 lg:w-56 ${
                      isActive
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
                      className="font-heading text-foreground text-2xl md:text-3xl lg:text-5xl"
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
                      transition: {
                        duration: 0.6,
                        delay: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className={`h-16 w-px bg-gradient-to-b md:h-24 ${
                    isActive
                      ? "from-foreground/50 to-transparent"
                      : "from-foreground/15 to-transparent"
                  } transition-colors duration-500`}
                />

                {/* Step info below line */}
                <div className="mt-1 flex flex-col items-center gap-2 px-3 text-center">
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : 0.3,
                      y: isActive ? 0 : 4,
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-heading text-foreground text-lg md:text-xl"
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
                        className="text-foreground/45 max-w-[160px] font-sans text-xs leading-relaxed italic"
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
          className="mt-20 grid grid-cols-1 items-center gap-6 pt-10 md:grid-cols-[1fr_auto]"
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
                className="font-heading text-foreground/10 shrink-0 text-5xl leading-none select-none md:text-7xl"
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
                <span className="font-heading text-foreground/50 text-sm tracking-widest uppercase">
                  {steps[active]?.title}
                </span>
                <p className="text-foreground/65 max-w-md font-sans text-sm leading-relaxed md:text-base">
                  {steps[active]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step progress dots */}
          <div className="flex shrink-0 items-center gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-foreground/70 h-1.5 w-8"
                    : "bg-foreground/20 hover:bg-foreground/40 h-1.5 w-1.5"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
