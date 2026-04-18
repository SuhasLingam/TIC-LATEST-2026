"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animate progress 0 → 100 over ~1.8s (a bit faster for better UX)
    let start: number | null = null;
    const DURATION = 1000;

    const tick = (timestamp: number) => {
      start ??= timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed < DURATION) {
        requestAnimationFrame(tick);
      } else {
        // Brief hold then start reveal
        setTimeout(() => setIsComplete(true), 150);
        // Total cleanup after reveal finishes (shutter takes 0.9s)
        setTimeout(() => setIsVisible(false), 1200);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* ── SHUTTER TOP PANEL ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={isComplete ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.1 }}
        className="pointer-events-auto absolute top-0 left-0 z-20 h-1/2 w-full overflow-hidden bg-[#050505]"
      >
        {/* Grain Texture */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </motion.div>

      {/* ── SHUTTER BOTTOM PANEL ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={isComplete ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.1 }}
        className="pointer-events-auto absolute bottom-0 left-0 z-20 h-1/2 w-full overflow-hidden bg-[#050505]"
      >
        {/* Grain Texture */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </motion.div>

      {/* ── CENTERED LOADER ── */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            key="center-loader"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
          >
            {/* Circular Progress (Minimalist Circle) */}
            <div className="relative flex h-32 w-32 items-center justify-center">
              {/* Static track */}
              <svg className="absolute h-full w-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="transparent"
                  className="text-white/5"
                />
                {/* Dynamic stroke */}
                <motion.circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="transparent"
                  strokeDasharray="377" // 2 * pi * 60
                  style={{
                    strokeDashoffset: 377 - (377 * progress) / 100,
                  }}
                  className="text-white/40"
                />
              </svg>

              {/* Percentage Counter */}
              <span className="font-heading relative z-40 text-4xl font-light tracking-tight text-white tabular-nums md:text-5xl">
                {Math.floor(progress)}
                <span className="ml-0.5 text-2xl text-white/20">%</span>
              </span>
            </div>

            {/* Subtle Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.4 }}
              className="mt-8 font-sans text-[10px] tracking-[0.4em] text-white uppercase"
            >
              Loading Clarity
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BACKGROUND GLOW (Behind Shutter) ── */}
      {!isComplete && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />
        </div>
      )}
    </div>
  );
}
