"use client";

import { motion, type Variants } from "framer-motion";

export function HowToJoin() {
  const steps = [
    {
      title: "Attend a TIC Event or Program",
      desc: "Start by participating in the ecosystem. This allows you to understand the culture and approach firsthand.",
    },
    {
      title: "Engage with the Community",
      desc: "Interact with other founders and operators. Build initial relationships and demonstrate your commitment to building.",
    },
    {
      title: "Apply for Membership",
      desc: "Submit an application outlining your startup's stage, goals, and what you aim to achieve with TIC's support.",
    },
    {
      title: "Review & Conversation",
      desc: "Our team manually reviews your application, followed by a conversation to ensure perfect alignment before onboarding.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-background border-foreground/5 relative w-full overflow-hidden border-t px-6 py-24 md:py-32 lg:px-24">
      <div className="z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span className="border-foreground/10 bg-foreground/5 text-foreground/50 mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] font-medium tracking-widest uppercase backdrop-blur-md">
            The Process
          </span>
          <h2 className="font-heading text-foreground text-4xl font-medium tracking-tight md:text-5xl lg:text-7xl">
            How to Join
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 lg:gap-12"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative flex items-center gap-8 md:items-start md:gap-12"
            >
              {/* Number indicator */}
              <div className="bg-background border-foreground/10 group-hover:bg-foreground/[0.02] relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-700 group-hover:border-[rgba(212,175,55,0.4)] md:h-28 md:w-28">
                <span className="font-heading text-foreground/30 group-hover:text-foreground text-3xl transition-colors duration-500 md:text-4xl">
                  0{idx + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col pt-2 md:pt-6">
                <h3 className="font-heading text-foreground mb-4 text-2xl leading-tight transition-colors duration-500 group-hover:text-[rgba(212,175,55,0.9)] md:text-4xl">
                  {step.title}
                </h3>
                <p className="text-foreground/50 group-hover:text-foreground/70 max-w-2xl font-sans text-lg leading-relaxed font-light transition-colors duration-500 md:text-xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
