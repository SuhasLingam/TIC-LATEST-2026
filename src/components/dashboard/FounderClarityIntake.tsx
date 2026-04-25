"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Zap, Target, Crosshair, BarChart3, Activity, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { createClient } from "~/utils/supabase/client";

const STEPS = [
  { icon: Zap,       label: "Identity",    hint: "Choose your card" },
  { icon: Zap,       label: "Constraint",  hint: "What's slowing you down?" },
  { icon: BarChart3, label: "Revenue",     hint: "12-Month Target" },
  { icon: Activity,  label: "Runway",      hint: "Current Cash Runway" },
  { icon: Eye,       label: "Metric",      hint: "Your North Star KPI" },
  { icon: Target,    label: "Blocker",     hint: "Your active 30-day obstacle" },
  { icon: Crosshair, label: "Initialize",  hint: "Generating your board" },
];

const TIER_CARDS: Record<string, string[]> = {
  Explorer: ["explorer-1.png", "explorer-2.png"],
  Visionary: ["visionary-1.png", "visionary-2.png", "visionary-3.png"],
  Trailblazer: ["trailblazer-1.png"],
};

const BOTTLENECKS = [
  { value: "Distribution / Go-to-Market",      label: "Distribution / GTM" },
  { value: "Product Engagement / Retention",   label: "Product Engagement" },
  { value: "Operational Bandwidth / Team",     label: "Ops Bandwidth / Team" },
  { value: "Capital / Fundraising",            label: "Capital & Fundraising" },
];

const REVENUE_TARGETS = [
  { value: "Pre-Revenue", label: "Pre-Revenue to $10k" },
  { value: "$100k-$500k", label: "$100k - $500k ARR" },
  { value: "$1M-$5M",     label: "$1M - $5M ARR" },
  { value: "$10M+",       label: "$10M+ ARR" },
];

const RUNWAYS = [
  { value: "< 6 Months", label: "Under 6 Months" },
  { value: "6-12 Months", label: "6 to 12 Months" },
  { value: "12-24 Months", label: "12 to 24 Months" },
  { value: "Profitable", label: "Profitable / Default Alive" },
];

import Image from "next/image";

export function FounderClarityIntake({ profileId, tier }: { profileId: string; tier: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [problemType, setProblemType] = useState("");
  const [revenueTarget, setRevenueTarget] = useState("");
  const [runway, setRunway] = useState("");
  const [coreMetric, setCoreMetric] = useState("");
  const [growthBlocker, setGrowthBlocker] = useState("");

  const completeOnboardingMutation = api.profile.completeOnboarding.useMutation();

  const canProceed =
    step === 1 ? !!selectedCard :
    step === 2 ? !!problemType :
    step === 3 ? !!revenueTarget :
    step === 4 ? !!runway :
    step === 5 ? coreMetric.trim().length >= 3 :
    step === 6 ? growthBlocker.trim().length >= 15 :
    true;

  const handleNext = () => {
    if (step < 7) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      void submitIntake();
    }
  };

  const submitIntake = async () => {
    setIsSubmitting(true);
    try {
      const compiledBlockerInfo = `Blocker: ${growthBlocker} | Metric: ${coreMetric} | Target: ${revenueTarget} | Runway: ${runway}`;
      
      await completeOnboardingMutation.mutateAsync({ 
        authUserId: profileId,
        problemType,
        growthBlocker: compiledBlockerInfo,
        selectedCardId: selectedCard!,
      });
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Failed to submit intake.");
    }
    setIsSubmitting(false);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 30 : -30, opacity: 0 }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4">

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/35">System Initialization</p>
          <h2 className="font-heading text-foreground mt-2 text-4xl tracking-tight">Clarity Intake.</h2>
          <p className="mt-2 text-sm text-foreground/45 leading-relaxed">
            We map your constraints before generating your execution board.
          </p>
        </div>

        {/* Step nodes */}
        <div className="mb-8 flex items-center justify-center w-full max-w-lg mx-auto">
          {STEPS.map((s, i) => {
            const idx = i + 1;
            const done = step > idx;
            const active = step === idx;
            const Icon = s.icon;
            return (
              <Fragment key={idx}>
                <div className="flex items-center gap-2 relative z-10 shrink-0">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                    done
                      ? "border-[rgba(212,175,55,0.40)] bg-[rgba(212,175,55,0.05)] text-[rgba(212,175,55,0.7)]"
                      : active
                      ? "border-[rgba(212,175,55,0.55)] bg-[rgba(212,175,55,0.04)] text-[rgba(212,175,55,0.8)]"
                      : "border-foreground/10 bg-foreground/[0.02] text-foreground/25"
                  }`}
                    style={active ? { boxShadow: "0 0 12px rgba(212,175,55,0.10)" } : {}}
                  >
                    {done ? "✓" : <Icon className="w-3.5 h-3.5" />}
                  </div>
                </div>
                
                {i < STEPS.length - 1 && (
                  <div className="relative h-px flex-1 mx-2 sm:mx-3 bg-foreground/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-foreground/20"
                      animate={{ width: done ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-2xl backdrop-blur-xl">
          {/* Gold top line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.40) 50%, transparent 100%)" }}
          />
          {/* Progress bar */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-foreground/5">
            <motion.div
              className="h-full bg-foreground/20"
              animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-2 text-[10px] tracking-widest uppercase text-foreground/35">
              {STEPS[step - 1]?.hint ?? "Loading..." }
            </div>

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="min-h-[220px]"
              >
                {step === 1 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-foreground text-xl">Select Your Identity Card</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                      {(TIER_CARDS[tier] ?? TIER_CARDS.Explorer ?? []).map((card) => (
                        <button
                          key={card}
                          onClick={() => setSelectedCard(card)}
                          className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                            selectedCard === card
                              ? "border-[rgba(212,175,55,0.7)] shadow-xl shadow-[rgba(212,175,55,0.1)]"
                              : "border-transparent opacity-40 hover:opacity-70"
                          }`}
                        >
                          <Image
                            src={`/cards/${card}`}
                            alt={card}
                            width={140}
                            height={210}
                            className="block object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-foreground text-xl">What is your primary bottleneck right now?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {BOTTLENECKS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setProblemType(opt.value)}
                          className={`border p-4 text-left text-sm transition-all duration-200 ${
                            problemType === opt.value
                              ? "border-[rgba(212,175,55,0.40)] bg-[rgba(212,175,55,0.05)] text-foreground/80"
                              : "border-foreground/10 bg-foreground/[0.02] text-foreground/50 hover:border-foreground/20 hover:text-foreground/70"
                          }`}
                        >
                          <div className={`mb-2 h-1.5 w-1.5 rounded-full transition-colors ${
                            problemType === opt.value ? "bg-[rgba(212,175,55,0.7)]" : "bg-foreground/20"
                          }`} />
                          <span className="text-xs leading-relaxed">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-foreground text-xl">What is your 12-month ARR target?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {REVENUE_TARGETS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRevenueTarget(opt.value)}
                          className={`border p-4 text-left text-sm transition-all duration-200 ${
                            revenueTarget === opt.value
                              ? "border-[rgba(212,175,55,0.40)] bg-[rgba(212,175,55,0.05)] text-foreground/80"
                              : "border-foreground/10 bg-foreground/[0.02] text-foreground/50 hover:border-foreground/20 hover:text-foreground/70"
                          }`}
                        >
                          <div className={`mb-2 h-1.5 w-1.5 rounded-full transition-colors ${
                            revenueTarget === opt.value ? "bg-[rgba(212,175,55,0.7)]" : "bg-foreground/20"
                          }`} />
                          <span className="text-xs leading-relaxed">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-foreground text-xl">What is your current cash runway?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {RUNWAYS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRunway(opt.value)}
                          className={`border p-4 text-left text-sm transition-all duration-200 ${
                            runway === opt.value
                              ? "border-[rgba(212,175,55,0.40)] bg-[rgba(212,175,55,0.05)] text-foreground/80"
                              : "border-foreground/10 bg-foreground/[0.02] text-foreground/50 hover:border-foreground/20 hover:text-foreground/70"
                          }`}
                        >
                          <div className={`mb-2 h-1.5 w-1.5 rounded-full transition-colors ${
                            runway === opt.value ? "bg-[rgba(212,175,55,0.7)]" : "bg-foreground/20"
                          }`} />
                          <span className="text-xs leading-relaxed">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="font-heading text-foreground text-xl">What is the single most important KPI you track?</h3>
                      <p className="mt-1 text-xs text-foreground/35 leading-relaxed">
                        e.g., Weekly Active Users, CAC Payback Period, Net Revenue Retention.
                      </p>
                    </div>
                    <input
                      type="text"
                      value={coreMetric}
                      onChange={(e) => setCoreMetric(e.target.value)}
                      autoFocus
                      placeholder="Your North Star Metric…"
                      className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm text-foreground/80 placeholder-foreground/25 focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                    <div className="flex justify-end">
                      <span className={`text-xs transition-colors ${coreMetric.length >= 3 ? "text-[rgba(212,175,55,0.5)]" : "text-foreground/25"}`}>
                        Required
                      </span>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="font-heading text-foreground text-xl">Define your active 30-day blocker.</h3>
                      <p className="mt-1 text-xs text-foreground/35 leading-relaxed">
                        Be specific. e.g. "CAC is too high on Meta" — not "growth is slow". Minimum 15 characters.
                      </p>
                    </div>
                    <textarea
                      value={growthBlocker}
                      onChange={(e) => setGrowthBlocker(e.target.value)}
                      rows={4}
                      autoFocus
                      placeholder="The specific thing blocking execution right now…"
                      className="w-full resize-none bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm text-foreground/80 placeholder-foreground/25 focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                    <div className="flex justify-end">
                      <span className={`text-xs transition-colors ${growthBlocker.length >= 15 ? "text-[rgba(212,175,55,0.5)]" : "text-foreground/25"}`}>
                        {growthBlocker.length} / 15 chars min
                      </span>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="flex h-12 w-12 items-center justify-center border border-[rgba(212,175,55,0.30)] bg-[rgba(212,175,55,0.04)]"
                      style={{ boxShadow: "0 0 50px 8px rgba(212,175,55,0.10)" }}
                    >
                      <Crosshair className="h-5 w-5 text-[rgba(212,175,55,0.7)]" />
                    </motion.div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[rgba(212,175,55,0.6)] mb-2">Ready</p>
                      <h3 className="font-heading text-foreground text-2xl">Generating Board</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/45 max-w-xs mx-auto">
                        Your execution matrix is being compiled. Click below to initialize.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action */}
            <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => { setDirection(-1); setStep((s) => s - 1); }}
                  className="text-xs text-foreground/35 hover:text-foreground/60 transition-colors"
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed || isSubmitting}
                className="inline-flex items-center gap-2 border border-[rgba(212,175,55,0.40)] px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : step === 7 ? (
                  <>Initialize Dashboard <ArrowRight className="h-4 w-4" /></>
                ) : (
                  <>Next Protocol <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
