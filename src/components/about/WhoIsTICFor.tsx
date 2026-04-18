"use client";

import { motion, type Variants } from "framer-motion";

export function WhoIsTICFor() {
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full overflow-hidden px-6 py-32 md:px-16 lg:px-24">
      <div className="pointer-events-none absolute right-0 bottom-0 h-3/4 w-3/4 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03)_0%,transparent_60%)] mix-blend-screen" />

      <div className="z-10 mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-20 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col items-start lg:w-5/12"
        >
          <span className="border-foreground/10 bg-foreground/5 text-foreground/70 mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] tracking-widest uppercase backdrop-blur-md">
            The Audience
          </span>
          <h2 className="font-heading text-foreground mb-10 text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-[5.5rem]">
            Who is TIC built for?
          </h2>
          <p className="text-foreground/60 font-sans text-xl leading-relaxed font-light md:text-2xl">
            The Incite Crew is built for individuals who are serious about
            building. We provide the environment and network to help you move
            forward.
          </p>
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex w-full flex-col gap-6 lg:w-6/12"
        >
          {[
            "Builders experimenting with startup ideas",
            "Early stage founders developing their first product",
            "Operators preparing to start their own ventures",
          ].map((text, idx) => (
            <motion.div
              key={text}
              variants={itemVariants}
              className="bg-foreground/[0.02] border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.04] group flex items-center rounded-[2rem] border p-8 transition-all duration-500 lg:p-10"
            >
              <div className="border-foreground/20 group-hover:border-foreground/40 mr-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-110">
                <span className="text-foreground/50 group-hover:text-foreground/90 font-sans text-sm transition-colors">
                  0{idx + 1}
                </span>
              </div>
              <p className="font-heading text-foreground/80 group-hover:text-foreground text-xl leading-snug transition-colors lg:text-2xl">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
