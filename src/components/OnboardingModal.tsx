"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { sendAuthOtp, verifyAuthOtp } from "~/app/actions/auth";
import { completeProfile, skipPayment } from "~/app/actions/profile";
import { useRouter } from "next/navigation";

const TIER_CARDS: Record<string, string[]> = {
  Explorer: ["explorer-1.png", "explorer-2.png"],
  Visionary: ["visionary-1.png", "visionary-2.png", "visionary-3.png"],
  Trailblazer: ["trailblazer-1.png"],
};

const TOTAL_STEPS = 5;

export function OnboardingModal({
  isOpen,
  onClose,
  tier,
}: {
  isOpen: boolean;
  onClose: () => void;
  tier?: "Explorer" | "Visionary" | "Trailblazer";
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startupStage, setStartupStage] = useState("Idea Stage");
  const [mainGoal, setMainGoal] = useState("");
  const [stageOpen, setStageOpen] = useState(false);

  const STAGES = ["Idea Stage", "MVP Built", "Pre-Seed / Seed", "Series A+", "Profitable / Bootstrapped"];

  if (!isOpen || !tier) return null;

  const cards = TIER_CARDS[tier] ?? [];

  const handleSendOtp = async () => {
    if (!email || !fullName) { setError("Please provide both name and email."); return; }
    setError(null);
    setIsLoading(true);
    const result = await sendAuthOtp(email);
    setIsLoading(false);
    if (result.error) setError(result.error);
    else setStep(2);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 8) return;
    setError(null);
    setIsLoading(true);
    const result = await verifyAuthOtp(email, otp);
    setIsLoading(false);
    if (result.error) setError("Invalid or expired code. Please try again.");
    else setStep(3);
  };

  const handleCompleteContext = async () => {
    if (!role || !companyName || !mainGoal || !selectedCard) {
      setError("Please fill all fields to proceed.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await completeProfile({ fullName, role, companyName, startupStage, mainGoal, tier, selectedCardId: selectedCard });
      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipPayment = async () => {
    setIsLoading(true);
    try {
      await skipPayment();
      router.push("/dashboard");
    } catch {
      setError("Failed to redirect.");
    } finally {
      setIsLoading(false);
    }
  };

  // Design system tokens from styling.md
  const inputCls =
    "w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors";

  const primaryBtnCls =
    "w-full rounded-full px-6 py-2.5 text-[9px] uppercase tracking-[0.3em] font-sans font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed bg-foreground text-white dark:bg-transparent dark:text-foreground dark:border dark:border-foreground/30 dark:hover:bg-foreground/10 dark:hover:border-foreground/60";

  const ghostBtnCls =
    "w-full rounded-full px-6 py-2.5 text-[9px] uppercase tracking-[0.3em] font-sans font-medium border border-foreground/20 text-foreground/60 hover:border-foreground/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg bg-white dark:bg-[#0c0c0c] border border-foreground/10 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Header: step dots + close */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${i === step
                    ? "w-4 h-1.5 bg-foreground"
                    : i < step
                      ? "w-1.5 h-1.5 bg-foreground/40"
                      : "w-1.5 h-1.5 bg-foreground/10"
                  }`}
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="font-sans text-[9px] uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors"
          >
            Close
          </button>
        </div>

        {/* Tier eyebrow */}
        <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/35 mb-6">
          {tier} Tier
        </p>

        {/* Error banner */}
        {error && (
          <div className="mb-5 px-3 py-2.5 border border-red-500/20 bg-red-500/5 text-red-500 dark:text-red-400 font-sans text-xs">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── STEP 0: Card Selection ── */}
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
                Select Your Card
              </h2>
              <p className="font-sans text-sm text-foreground/50 mb-6">
                Choose your membership identifier.
              </p>

              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {cards.map((cardFile) => (
                  <button
                    key={cardFile}
                    onClick={() => setSelectedCard(cardFile)}
                    className={`shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${selectedCard === cardFile
                        ? "border-foreground"
                        : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                  >
                    <Image
                      src={`/cards/${cardFile}`}
                      alt={cardFile}
                      width={180}
                      height={280}
                      className="object-cover block"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <button
                  disabled={!selectedCard}
                  onClick={() => setStep(1)}
                  className={primaryBtnCls}
                >
                  Proceed
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: Basic Info ── */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
                Basic Info
              </h2>
              <p className="font-sans text-sm text-foreground/50 mb-6">
                Let&apos;s start with the basics.
              </p>

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className={primaryBtnCls}
              >
                {isLoading ? "Sending..." : "Send Login Code"}
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: OTP Verify ── */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
                Check Your Email
              </h2>
              <p className="font-sans text-sm text-foreground/50 mb-6">
                We sent a 6-digit code to{" "}
                <span className="text-foreground font-medium">{email}</span>.
              </p>

              <input
                type="text"
                inputMode="numeric"
                placeholder="00000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))
                }
                className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-5 mb-6 text-center tracking-[0.6em] text-3xl font-heading text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground/30 transition-colors"
              />

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length < 8}
                  className={primaryBtnCls}
                >
                  {isLoading ? "Verifying..." : "Verify & Proceed"}
                </button>
                <button onClick={() => setStep(1)} className={ghostBtnCls}>
                  Back
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Account Context ── */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
                Account Setup
              </h2>
              <p className="font-sans text-sm text-foreground/50 mb-6">
                Tell us about yourself to curate your {tier} dashboard.
              </p>

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Your Role (e.g. Founder, CEO)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Company / Startup Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputCls}
                />
                <div className="relative">
                  {/* Custom theme-aware dropdown — avoids native browser popup */}
                  <button
                    type="button"
                    onClick={() => setStageOpen(!stageOpen)}
                    className={inputCls + " flex items-center justify-between cursor-pointer text-left"}
                  >
                    <span>{startupStage}</span>
                    <span className={`text-foreground/30 text-xs transition-transform duration-200 ${stageOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {stageOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-[#0c0c0c] border border-foreground/10 shadow-2xl">
                      {STAGES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { setStartupStage(s); setStageOpen(false); }}
                          className={`w-full text-left px-3 py-2.5 font-sans text-sm transition-colors ${
                            s === startupStage
                              ? "text-foreground bg-foreground/5"
                              : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <textarea
                  placeholder="Your main goal inside TIC..."
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                  rows={3}
                  className={inputCls + " resize-none"}
                />
              </div>

              <button
                onClick={handleCompleteContext}
                disabled={isLoading}
                className={primaryBtnCls}
              >
                {isLoading ? "Saving..." : "Curate My Dashboard"}
              </button>
            </motion.div>
          )}

          {/* ── STEP 4: Payment ── */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
                Secure Your Access
              </h2>
              <p className="font-sans text-sm text-foreground/50 mb-6">
                Complete your {tier} membership payment.
              </p>

              <div className="border border-foreground/10 bg-foreground/[0.02] rounded-2xl flex flex-col items-center justify-center h-36 mb-6">
                <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/35 mb-1">
                  Payment Gateway
                </p>
                <p className="font-sans text-xs text-foreground/30 text-center px-6 leading-relaxed">
                  Test mode — Razorpay integration coming soon.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => router.push("/dashboard"), 1500);
                  }}
                  disabled={isLoading}
                  className={primaryBtnCls}
                >
                  Pay Now
                </button>
                <button
                  onClick={handleSkipPayment}
                  disabled={isLoading}
                  className={ghostBtnCls}
                >
                  Pay Later
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
