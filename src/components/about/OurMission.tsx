"use client";

import { motion } from "framer-motion";

export function OurMission() {
    return (
        <section className="relative w-full px-6 py-32 md:px-16 lg:px-24 bg-foreground/[0.01] overflow-hidden">
            {/* Subtle grain texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <div className="z-10 flex flex-col items-start w-full max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 w-full">
                    {/* Sticky left column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative h-full"
                    >
                        <div className="sticky top-32">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground">
                                Our Mission.
                            </h2>
                            <div className="mt-8 h-px w-24 bg-foreground/20" />
                        </div>
                    </motion.div>

                    {/* Scrolling narrative right column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col space-y-12 lg:space-y-16"
                    >
                        <p className="text-3xl md:text-4xl text-foreground font-heading leading-snug tracking-tight">
                            Our mission is to help ambitious builders transform ideas into companies.
                        </p>
                        <p className="text-xl md:text-2xl text-foreground/50 font-sans leading-relaxed tracking-wide font-light">
                            Starting a startup is often chaotic and uncertain. Many founders struggle with direction, access to mentors, and the right network. TIC exists to bridge that gap by creating an environment where founders can learn, collaborate, and build with the right support system around them.
                        </p>
                        <div className="p-8 md:p-10 rounded-3xl bg-foreground/[0.03] border border-foreground/10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgba(212,175,55,0.4)] to-transparent" />
                            <p className="text-2xl md:text-3xl text-foreground/90 font-heading leading-relaxed relative z-10">
                                We believe strong startups emerge when talented individuals are placed in the right environments with the right people.
                            </p>
                        </div>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-32 self-center w-full flex justify-center pb-8"
                >
                    <p className="text-[10px] md:text-xs text-foreground/30 uppercase tracking-[0.4em] text-center flex items-center gap-4">
                        <span className="w-8 h-px bg-foreground/20" />
                        Curated for serious founders
                        <span className="w-8 h-px bg-foreground/20" />
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
