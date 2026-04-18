"use client";

import { motion, type Variants } from "framer-motion";

export function EventComparison() {
  const comparisons = [
    {
      traditional: "Stop at networking",
      tic: "Move founders forward",
    },
    {
      traditional: "No structured progession",
      tic: "Every event feeds into the next",
    },
    {
      traditional: "Disconnected Experiences",
      tic: "Continous progess , not restarts",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-foreground/[0.01] relative w-full px-6 py-32 md:px-16 lg:px-24">
      <div className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <h2 className="font-heading text-foreground text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Why Our Events Are Different ?
          </h2>
        </motion.div>

        <div className="relative w-full">
          {/* Headers */}
          <div className="mb-8 flex w-full lg:mb-12">
            <div className="w-1/2 text-center lg:pl-16 lg:text-left">
              <span className="font-heading text-foreground/50 text-xl font-medium md:text-2xl">
                Traditional Events
              </span>
            </div>
            <div className="w-1/2 text-center lg:pl-16 lg:text-left">
              <span className="font-heading text-foreground flex items-center justify-center gap-3 text-xl font-medium md:text-2xl lg:justify-start">
                <span className="h-2 w-2 rounded-full bg-[rgba(212,175,55,0.8)] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                TIC Events
              </span>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4 lg:gap-6"
          >
            {comparisons.map((row, idx) => (
              <motion.div
                key={idx}
                variants={rowVariants}
                className="border-foreground/10 group relative flex w-full flex-row overflow-hidden rounded-[2rem] border"
              >
                {/* Left Side (Traditional) */}
                <div className="bg-background/50 border-foreground/10 group-hover:bg-background flex w-1/2 items-center justify-center border-r p-6 backdrop-blur-sm transition-colors duration-500 lg:justify-start lg:p-12">
                  <p className="text-foreground/40 decoration-foreground/20 text-center font-sans text-base font-light line-through decoration-2 lg:text-left lg:text-xl">
                    {row.traditional}
                  </p>
                </div>

                {/* Right Side (TIC) */}
                <div className="bg-foreground/[0.03] group-hover:bg-foreground/[0.05] relative flex w-1/2 items-center justify-center overflow-hidden p-6 transition-colors duration-500 lg:justify-start lg:p-12">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <p className="text-foreground/90 relative z-10 text-center font-sans text-lg font-medium lg:text-left lg:text-2xl">
                    {row.tic}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
