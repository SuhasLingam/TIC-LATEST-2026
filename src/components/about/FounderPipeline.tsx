"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function FounderPipeline() {
    const pipelineSteps = [
        {
            id: "01",
            title: "Hackathon",
            desc: "Builders participate in hackathons where they collaborate, test ideas, and build prototypes."
        },
        {
            id: "02",
            title: "Community",
            desc: "Participants who show strong potential become part of the TIC founder community where they gain access to discussions, mentorship, and learning opportunities."
        },
        {
            id: "03",
            title: "Conference",
            desc: "Our conferences bring founders, operators, and industry leaders together to share insights, build relationships, and strengthen the ecosystem."
        },
        {
            id: "04",
            title: "Investor Connect",
            desc: "Selected founders gain the opportunity to present their ideas to investors and mentors through curated events and programs."
        },
        {
            id: "05",
            title: "Trailblazer",
            desc: "The most committed founders become part of the Trailblazer program where they gain deeper support, strategic guidance, and stronger ecosystem connections."
        }
    ];

    const [hoveredIdx, setHoveredIdx] = useState<number | null>(0); // Initialize with first one active

    return (
        <section className="relative w-full px-6 py-32 md:px-16 lg:px-24 overflow-hidden bg-transparent">
            {/* Soft background grid or glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-transparent via-foreground/5 to-transparent blur-[100px] pointer-events-none" />

            <div className="z-10 flex flex-col items-center w-full max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-16 md:mb-24"
                >
                    <span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 backdrop-blur-md text-[10px] uppercase tracking-widest text-foreground/70 mb-8">
                        The Pipeline
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground">
                        Founder Pathway
                    </h2>
                </motion.div>

                {/* Horizontal Interactive layout */}
                <div className="w-full relative">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 w-full xl:justify-center">
                        {pipelineSteps.map((step, idx) => {
                            const isActive = hoveredIdx === idx;

                            return (
                                <motion.div
                                    key={step.id}
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onTouchStart={() => setHoveredIdx(idx)}
                                    layout
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative flex flex-col rounded-[2rem] border overflow-hidden transition-all duration-700 cursor-pointer p-8 md:p-10
                                        ${isActive
                                            ? "lg:flex-[2.5] bg-foreground/[0.04] border-[rgba(212,175,55,0.3)] lg:-translate-y-4"
                                            : "lg:flex-[1] bg-foreground/[0.01] border-foreground/10 hover:bg-foreground/[0.02]"
                                        }
                                    `}
                                    style={{
                                        minHeight: '400px'
                                    }}
                                >
                                    {/* Active Glow Layer */}
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.1)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none"
                                        />
                                    )}

                                    <div className="flex flex-col h-full justify-between relative z-10 w-full lg:min-w-[200px]">
                                        <div className="flex justify-between items-start w-full">
                                            <div className={`text-sm font-sans tracking-widest transition-colors duration-500 flex items-center justify-center rounded-full w-10 h-10 border ${isActive ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'border-foreground/20 text-foreground/50'}`}>
                                                {step.id}
                                            </div>

                                            {/* Step Connector Indicator */}
                                            {/* {isPast && (
                                                <div className="hidden lg:flex items-center text-[10px] text-foreground/30 uppercase tracking-widest">
                                                    Passed
                                                </div>
                                            )} */}
                                        </div>

                                        <div className="mt-auto">
                                            <h3 className={`font-heading transition-all duration-500 mb-4 ${isActive ? 'text-4xl text-foreground' : 'text-2xl text-foreground/60'}`}>
                                                {step.title}
                                            </h3>

                                            <div className={`overflow-hidden transition-all duration-700 w-full max-w-sm ${isActive ? 'max-h-40 opacity-100' : 'lg:max-h-0 lg:opacity-0 max-h-40 opacity-50'}`}>
                                                <p className="text-base text-foreground/70 font-sans leading-relaxed font-light">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
