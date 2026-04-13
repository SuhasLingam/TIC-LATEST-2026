"use client";

import { motion, type Variants } from "framer-motion";

export function WhoIsTICFor() {
    const listVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative w-full px-6 py-32 md:px-16 lg:px-24 overflow-hidden">
            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />

            <div className="z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between w-full max-w-[1400px] mx-auto gap-20">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-5/12 flex flex-col items-start"
                >
                    <span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 backdrop-blur-md text-[10px] uppercase tracking-widest text-foreground/70 mb-8">
                        The Audience
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-medium tracking-tight text-foreground leading-[1.05] mb-10">
                        Who is TIC built for?
                    </h2>
                    <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-sans font-light">
                        The Incite Crew is built for individuals who are serious about building. We provide the environment and network to help you move forward.
                    </p>
                </motion.div>

                <motion.div
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full lg:w-6/12 flex flex-col gap-6"
                >
                    {[
                        "Builders experimenting with startup ideas",
                        "Early stage founders developing their first product",
                        "Operators preparing to start their own ventures"
                    ].map((text, idx) => (
                        <motion.div
                            key={text}
                            variants={itemVariants}
                            className="flex items-center p-8 lg:p-10 rounded-[2rem] bg-foreground/[0.02] border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all duration-500 group"
                        >
                            <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center mr-6 group-hover:scale-110 group-hover:border-foreground/40 transition-all duration-500 shrink-0">
                                <span className="text-sm font-sans text-foreground/50 group-hover:text-foreground/90 transition-colors">0{idx + 1}</span>
                            </div>
                            <p className="text-xl lg:text-2xl font-heading text-foreground/80 group-hover:text-foreground transition-colors leading-snug">
                                {text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
