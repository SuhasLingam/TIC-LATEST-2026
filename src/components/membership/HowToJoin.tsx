"use client";

import { motion, type Variants } from "framer-motion";

export function HowToJoin() {
    const steps = [
        {
            title: "Attend a TIC Event or Program",
            desc: "Start by participating in the ecosystem. This allows you to understand the culture and approach firsthand."
        },
        {
            title: "Engage with the Community",
            desc: "Interact with other founders and operators. Build initial relationships and demonstrate your commitment to building."
        },
        {
            title: "Apply for Membership",
            desc: "Submit an application outlining your startup's stage, goals, and what you aim to achieve with TIC's support."
        },
        {
            title: "Review & Conversation",
            desc: "Our team manually reviews your application, followed by a conversation to ensure perfect alignment before onboarding."
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative w-full px-6 py-24 md:py-32 lg:px-24 bg-background overflow-hidden border-t border-foreground/5">
            <div className="z-10 flex flex-col items-center w-full max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-24"
                >
                    <span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 backdrop-blur-md text-[10px] uppercase tracking-widest text-foreground/50 mb-8 font-medium">
                        The Process
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground">
                        How to Join
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-8 lg:gap-12 w-full max-w-4xl relative mx-auto"
                >
                    {/* Connecting vertical line */}
                    <div className="absolute left-[39px] md:left-[55px] top-[40px] bottom-[40px] w-px bg-gradient-to-b from-foreground/5 via-foreground/20 to-foreground/5" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="relative flex items-center md:items-start gap-8 md:gap-12 group"
                        >
                            {/* Number indicator */}
                            <div className="relative z-10 flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-background border border-foreground/10 group-hover:border-[rgba(212,175,55,0.4)] group-hover:bg-foreground/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-700 shrink-0">
                                <span className="text-3xl md:text-4xl font-heading text-foreground/30 group-hover:text-foreground transition-colors duration-500">
                                    0{idx + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col pt-2 md:pt-6">
                                <h3 className="text-2xl md:text-4xl font-heading text-foreground leading-tight mb-4 group-hover:text-[rgba(212,175,55,0.9)] transition-colors duration-500">
                                    {step.title}
                                </h3>
                                <p className="text-lg md:text-xl font-sans text-foreground/50 font-light leading-relaxed max-w-2xl group-hover:text-foreground/70 transition-colors duration-500">
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
