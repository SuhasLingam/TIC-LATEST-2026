"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who is The Incite Crew built for?",
    a: "TIC is built for founders who are actively building real companies and want structured clarity, not motivation or hype. It is not for idea-stage exploration or passive consumption.",
  },
  {
    q: "What's the difference between Explorer and Visionary?",
    a: "Explorer is a self-serve tier for founders who need structure before scale — foundation manuals, monthly sessions, and essential design support. Visionary is a deeper engagement: brand architecture, content engine, 1:1 strategy sessions, and a custom execution roadmap.",
  },
  {
    q: "What is Trailblazer and how do I access it?",
    a: "Trailblazer is our VIP partnership tier for operators, leaders, and teams where execution quality and discretion matter. Access is invite-only. You can submit a request and we will review it based on fit.",
  },
  {
    q: "Are applications always open?",
    a: "No. Applications are reviewed on a rolling basis and access is intentionally controlled. Not every application will be accepted. We prioritize founders where TIC is the right fit.",
  },
  {
    q: "How long does it take to get a response?",
    a: "Typically within 3–5 business days. For Trailblazer access requests, the review process may take longer given the selective nature of the tier.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" },
  }),
};

export function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-28 md:px-16 lg:px-24"
    >
      {/* Top separator */}
      <div className="border-foreground/10 mx-auto mb-20 w-full max-w-7xl border-t" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
        {/* LEFT — HEADER */}
        <motion.div
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="lg:sticky lg:top-28"
        >
          <p className="text-foreground/40 mb-3 font-sans text-xs tracking-[0.2em] uppercase">
            Got questions
          </p>
          <h2 className="font-heading text-foreground text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            Frequently
            <br />
            asked
          </h2>
        </motion.div>

        {/* RIGHT — ACCORDION */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              custom={i + 1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <div
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  openIndex === i
                    ? "border-foreground/20 bg-foreground/[0.04]"
                    : "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.03]"
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={`font-sans text-sm transition-colors ${
                      openIndex === i ? "text-foreground" : "text-foreground/70"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 transition-all duration-300 ${
                      openIndex === i ? "text-foreground" : "text-foreground/35"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-foreground/55 px-5 pb-5 font-sans text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
