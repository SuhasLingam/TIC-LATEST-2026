"use client";

import { motion } from "framer-motion";

export function EventsHero() {
    return (
        <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:px-16 lg:px-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none" />
            
            <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10 inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 backdrop-blur-md"
                >
                    <span className="text-[10px] uppercase tracking-widest text-foreground/70">Our Experiences</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-medium tracking-tight text-foreground leading-[1.08] mb-12"
                >
                    Building the Next <br />
                    <span className="text-foreground/40">Generation</span> of Founders
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-foreground/60 leading-relaxed font-sans max-w-3xl space-y-6"
                >
                    <p>
                        TIC events are designed to bring ambitious builders together, challenge ideas, and create real startup momentum.
                    </p>
                    <p>
                        Unlike traditional startup events that end after a single gathering, TIC events are structured as part of a broader founder pipeline.
                    </p>
                </motion.div>
            </div>
            
            <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 1 }}
                 className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-foreground/30 to-transparent" />
            </motion.div>
        </section>
    );
}
