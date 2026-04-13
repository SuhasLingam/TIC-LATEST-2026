"use client";

import { motion } from "framer-motion";

export function MembershipGoal() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-32 md:px-16 lg:px-24 bg-foreground/[0.02]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[rgba(212,175,55,0.03)] to-transparent pointer-events-none" />
            
            <div className="z-10 flex flex-col items-start w-full max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 w-full">
                    {/* Sticky left column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative h-full"
                    >
                        <div className="sticky top-32">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-foreground leading-[1.1]">
                                The Goal of Membership.
                            </h2>
                        </div>
                    </motion.div>

                    {/* Right column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col space-y-10 lg:space-y-16"
                    >
                        <p className="text-3xl md:text-4xl text-foreground font-heading leading-snug tracking-tight">
                            The purpose of TIC membership is not simply networking.
                        </p>
                        <p className="text-xl md:text-2xl text-foreground/60 font-sans leading-relaxed tracking-wide font-light">
                            It is about building a community where founders support each other, share insights, and gain access to opportunities that accelerate the journey from idea to company.
                        </p>
                        <div className="p-8 md:p-10 rounded-3xl bg-background border border-foreground/10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgba(212,175,55,0.6)] to-[rgba(212,175,55,0.1)]" />
                            <p className="text-2xl md:text-3xl text-foreground/90 font-heading leading-relaxed relative z-10 italic">
                                &quot;TIC aims to create an environment where builders grow into founders and founders grow into successful companies.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
