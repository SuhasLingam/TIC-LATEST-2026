"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ApplicationModal } from "~/components/ApplicationModal";

export function MembershipHero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:px-16 lg:px-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />
            
            <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-[6.5rem] font-heading font-medium tracking-tight text-foreground leading-[1.05] mb-12"
                >
                    Join the <br className="hidden md:block"/>
                    <span className="text-foreground/40 italic">Builder</span> Network
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-foreground/60 leading-relaxed font-sans max-w-3xl space-y-6 font-light mb-12"
                >
                    <p>
                        Membership at The Incite Crew is designed for founders who want to build serious companies and surround themselves with others who share the same ambition.
                    </p>
                    <p>
                        TIC membership is structured into three tiers designed to support founders at different stages of their journey.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-foreground/90 border border-transparent shadow-[0_0_40px_rgba(212,175,55,0.2)] dark:shadow-[0_0_40px_rgba(212,175,55,0.15)] dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                        Apply for Membership
                    </button>
                    <ApplicationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                </motion.div>
            </div>
            

        </section>
    );
}
