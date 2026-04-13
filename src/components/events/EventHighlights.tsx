"use client";

import { motion, type Variants } from "framer-motion";

export function EventHighlights() {
    const events = [
        {
            title: "Hackathons",
            intro: (
                <>
                    <span className="text-foreground">Hackathons are the starting point of the TIC ecosystem.</span> These events bring together builders, developers, designers, and operators to collaborate and build solutions within a focused time frame.
                </>
            ),
            points: [
                "Validate ideas",
                "Build prototypes",
                "Experiment with new technologies",
                "Solve real problems"
            ],
            footer: "Hackathons help us discover individuals who are capable of execution and committed to building."
        },
        {
            title: "Founder Conferences",
            intro: (
                <>
                    <span className="text-foreground">Our conferences bring together founders, operators, mentors, and industry leaders.</span> The goal of these events is to facilitate meaningful conversations around building companies.
                </>
            ),
            points: [
                "Founder journeys and lessons",
                "Startup strategy discussions",
                "Product development insights",
                "Growth and scaling conversations"
            ],
            footer: "These events allow founders to learn from real experiences while building valuable relationships within the ecosystem."
        },
        {
            title: "Investor Connect Hackathons",
            intro: (
                <>
                    <span className="text-foreground">Investor Connect Hackathons are designed for founders who are ready to take their startups to the next stage.</span> These events provide selected teams with the opportunity to present their ideas to investors, mentors, and experienced operators.
                </>
            ),
            points: [
                "Receiving feedback from experienced builders",
                "Improving product and business models",
                "Creating opportunities for investment discussions"
            ],
            footer: ""
        }
    ];

    const blockVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative w-full px-6 py-24 md:py-32 lg:px-24 bg-background">
            <div className="z-10 flex flex-col items-center w-full max-w-[1400px] mx-auto gap-32">
                {events.map((event, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                        <motion.div
                            key={event.title}
                            variants={blockVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col lg:flex-row items-center justify-between w-full gap-16 lg:gap-24 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        >
                            {/* Content Side */}
                            <div className="w-full lg:w-5/12 flex flex-col items-start px-2">
                                <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-6 font-medium">0{idx + 1} {'//'} Event Type</span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-foreground leading-[1.1] mb-8">
                                    {event.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-sans font-light mb-10">
                                    {event.intro}
                                </p>
                                {event.footer && (
                                    <div className="p-6 md:p-8 rounded-[1.5rem] bg-foreground/[0.02] border border-foreground/10 relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-foreground/40 to-transparent rounded-l-[1.5rem]" />
                                        <p className="text-base text-foreground/80 font-sans italic">
                                            &quot;{event.footer}&quot;
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Features Side (Bento-ish Grid) */}
                            <div className="w-full lg:w-6/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {event.points.map((point, pIdx) => (
                                    <div
                                        key={pIdx}
                                        className="flex flex-col justify-center p-8 lg:p-10 min-h-[160px] rounded-[2rem] bg-foreground/[0.02] border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all duration-500 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <span className="text-[10px] font-sans text-foreground/50">✦</span>
                                        </div>
                                        <h3 className="text-xl font-heading text-foreground/80 leading-snug group-hover:text-foreground transition-colors">
                                            {point}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
