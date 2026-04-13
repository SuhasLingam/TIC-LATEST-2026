"use client";

import { motion } from "framer-motion";

export function EventsHero() {
    return (
        <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:px-16 lg:px-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none" />
            
            <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">

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
            

        </section>
    );
}
