"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = "THE INCITE CREW".split("");

export function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress 0 → 100 over ~2.4s
        let start: number | null = null;
        const DURATION = 2400;

        const tick = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const pct = Math.min((elapsed / DURATION) * 100, 100);
            setProgress(pct);
            if (elapsed < DURATION) {
                requestAnimationFrame(tick);
            } else {
                // Brief pause then fade out
                setTimeout(() => setVisible(false), 200);
            }
        };

        const raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
                >
                    {/* ── AMBIENT GLOW ORBS ── */}
                    <div className="pointer-events-none absolute inset-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.35, scale: 1 }}
                            transition={{ duration: 1.8, ease: "easeOut" }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, rgba(180,160,255,0.4) 0%, rgba(100,80,200,0.15) 50%, transparent 75%)",
                                filter: "blur(60px)",
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.25 }}
                            transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
                            className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full"
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, transparent 70%)",
                                filter: "blur(70px)",
                            }}
                        />
                    </div>

                    {/* ── LETTER-BY-LETTER REVEAL ── */}
                    <div className="relative flex flex-col items-center gap-6">
                        <motion.div
                            className="flex gap-[0.04em] overflow-hidden"
                            aria-label="The Incite Crew"
                        >
                            {LETTERS.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.3 + i * 0.055,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className={`font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-[0.08em] text-white ${letter === " " ? "w-[0.35em]" : ""
                                        }`}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                            className="font-sans text-xs tracking-[0.28em] uppercase text-white/35"
                        >
                            Your Unfair Advantage
                        </motion.p>
                    </div>

                    {/* ── BOTTOM PROGRESS BAR ── */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/10">
                        <motion.div
                            className="h-full bg-white/60"
                            style={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    {/* ── CORNER COUNTER ── */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="absolute bottom-5 right-6 font-sans text-[11px] tabular-nums text-white/25"
                    >
                        {String(Math.floor(progress)).padStart(2, "0")}%
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
