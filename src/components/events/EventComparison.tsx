"use client";

import { motion, type Variants } from "framer-motion";

export function EventComparison() {
    const comparisons = [
        {
            traditional: "Stop at networking",
            tic: "Move founders forward"
        },
        {
            traditional: "No structured progession",
            tic: "Every event feeds into the next"
        },
        {
            traditional: "Disconnected Experiences",
            tic: "Continous progess , not restarts"
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const rowVariants: Variants = {
        hidden: { opacity: 0, scale: 0.98, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative w-full px-6 py-32 md:px-16 lg:px-24 bg-foreground/[0.01]">
            <div className="z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-foreground">
                        Why Our Events Are Different ?
                    </h2>
                </motion.div>

                <div className="w-full relative">
                    {/* Headers */}
                    <div className="flex w-full mb-8 lg:mb-12">
                        <div className="w-1/2 text-center lg:text-left lg:pl-16">
                            <span className="text-xl md:text-2xl font-heading text-foreground/50 font-medium">Traditional Events</span>
                        </div>
                        <div className="w-1/2 text-center lg:text-left lg:pl-16">
                            <span className="text-xl md:text-2xl font-heading text-foreground font-medium flex items-center justify-center lg:justify-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-[rgba(212,175,55,0.8)] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
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
                                className="flex flex-row w-full rounded-[2rem] border border-foreground/10 overflow-hidden relative group"
                            >
                                {/* Left Side (Traditional) */}
                                <div className="w-1/2 p-6 lg:p-12 flex items-center justify-center lg:justify-start bg-background/50 backdrop-blur-sm border-r border-foreground/10 transition-colors duration-500 group-hover:bg-background">
                                    <p className="text-base lg:text-xl font-sans text-foreground/40 text-center lg:text-left line-through decoration-foreground/20 decoration-2 font-light">
                                        {row.traditional}
                                    </p>
                                </div>

                                {/* Right Side (TIC) */}
                                <div className="w-1/2 p-6 lg:p-12 flex items-center justify-center lg:justify-start bg-foreground/[0.03] transition-colors duration-500 group-hover:bg-foreground/[0.05] relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    <p className="text-lg lg:text-2xl font-sans text-foreground/90 text-center lg:text-left font-medium relative z-10">
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
