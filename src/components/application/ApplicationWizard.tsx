"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2, User, Building2, BrainCircuit, BarChart3, Layers } from "lucide-react";

type FormState = {
  name?: string;
  email: string;
  companyName?: string;
  website?: string;
  role?: string;
  startupStage?: string;
  buildingContext?: string;
  currentChallenge?: string;
  traction?: string;
  teamSize?: string;
  whyTic?: string;
  tierInterest?: string;
};

const STEPS = [
  { label: "Identity",  icon: User,         sub: "Who are you?" },
  { label: "Company",   icon: Building2,     sub: "Your venture" },
  { label: "Context",   icon: BrainCircuit,  sub: "What you're building" },
  { label: "Signals",   icon: BarChart3,     sub: "Traction & fit" },
  { label: "Path",      icon: Layers,        sub: "Choose your tier" },
];

const TIER_DATA = [
  {
    name: "Explorer",
    tag: "Getting Started",
    desc: "Early-stage founders validating ideas. Community, events, and foundational resources.",
  },
  {
    name: "Visionary",
    tag: "Building Momentum",
    desc: "Founders with traction seeking structured growth. Strategy sessions and operator access.",
    gold: true,
  },
  {
    name: "Trailblazer",
    tag: "Scaling Fast",
    desc: "Revenue-generating founders ready to scale. Dedicated support, warm intros, and advisory.",
  },
];

// Custom theme-adaptive dropdown — uses foreground/x tokens
function StyledSelect({
  value, onChange, placeholder, options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" onBlur={() => setTimeout(() => setOpen(false), 150)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border border-foreground/10 bg-foreground/[0.03] px-3 py-3 text-left text-sm transition-colors focus:outline-none focus:border-foreground/30 hover:border-foreground/20"
      >
        <span className={selected ? "text-foreground/80" : "text-foreground/30"}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="h-3.5 w-3.5 text-foreground/30 shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 mt-1 w-full overflow-hidden border border-foreground/10 bg-background backdrop-blur-xl shadow-2xl"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-foreground/[0.04] ${
                  value === opt.value
                    ? "text-[rgba(212,175,55,0.9)] bg-[rgba(212,175,55,0.04)]"
                    : "text-foreground/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldInput({
  label, value, onChange, placeholder, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div className="group flex flex-col space-y-2">
      <label className="text-xs tracking-[0.2em] uppercase text-foreground/40 group-focus-within:text-foreground/60 transition-colors">
        {label}{required && <span className="ml-1 text-[rgba(212,175,55,0.7)]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm text-foreground/80 placeholder-foreground/25 focus:outline-none focus:border-foreground/30 transition-colors"
      />
    </div>
  );
}

function FieldTextarea({
  label, value, onChange, placeholder, rows = 3, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; rows?: number; hint?: string;
}) {
  return (
    <div className="group flex flex-col space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-xs tracking-[0.2em] uppercase text-foreground/40 group-focus-within:text-foreground/60 transition-colors">
          {label}
        </label>
        {hint && <span className="text-[10px] text-foreground/25 italic">{hint}</span>}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm text-foreground/80 placeholder-foreground/25 focus:outline-none focus:border-foreground/30 transition-colors"
      />
      <div className="flex justify-end">
        <span className={`text-[9px] transition-colors ${value.length >= 20 ? "text-[rgba(212,175,55,0.5)]" : "text-foreground/25"}`}>
          {value.length} / 20 chars min
        </span>
      </div>
    </div>
  );
}

export function ApplicationWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawToken = searchParams.get("token");
  const urlInterest = searchParams.get("interest");

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [token, setToken] = useState<string | null>(rawToken);
  const [isSaving, setIsSaving] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [formData, setFormData] = useState<FormState>({
    email: "",
    tierInterest: urlInterest
      ? urlInterest.charAt(0).toUpperCase() + urlInterest.slice(1)
      : undefined,
  });

  const { data: draftData, isLoading: isLoadingDraft } = api.application.getByToken.useQuery(
    { token: rawToken! },
    { enabled: !!rawToken, refetchOnWindowFocus: false }
  );

  const saveDraftMutation = api.application.saveDraft.useMutation();
  const submitFinalMutation = api.application.submitFinal.useMutation();
  const sendResumeLinkMutation = api.application.sendResumeLink.useMutation();

  useEffect(() => {
    if (draftData) {
      setFormData({
        name: draftData.name || "",
        email: draftData.email,
        companyName: draftData.companyName || "",
        website: draftData.website || "",
        role: draftData.role || "",
        startupStage: draftData.startupStage || "",
        buildingContext: draftData.buildingContext || "",
        currentChallenge: draftData.currentChallenge || "",
        traction: draftData.traction || "",
        teamSize: draftData.teamSize || "",
        whyTic: draftData.whyTic || "",
        tierInterest: draftData.tierInterest || formData.tierInterest,
      });
      if (!draftData.companyName) setStep(2);
      else if (!draftData.buildingContext) setStep(3);
      else if (!draftData.traction) setStep(4);
      else setStep(5);
    }
  }, [draftData]);

  const updateField = (field: keyof FormState, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleNext = async () => {
    if (step === 1 && !formData.email) return;
    if (step === 2 && (!formData.name || !formData.companyName)) return;
    if (step === 3 && (
      (formData.buildingContext?.length ?? 0) < 20 || 
      (formData.currentChallenge?.length ?? 0) < 20
    )) return;
    if (step === 4 && (
      !formData.traction || 
      (formData.whyTic?.length ?? 0) < 20
    )) return;

    setIsSaving(true);
    try {
      const res = await saveDraftMutation.mutateAsync({ ...formData, token: token ?? undefined });
      if (res?.token && !token) {
        setToken(res.token);
        router.replace(`/apply?token=${res.token}`);
      }
      setDirection(1);
      setStep((s) => Math.min(5, s + 1));
    } catch (err) {
      console.error(err);
    }
    setIsSaving(false);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSaveAndExit = async () => {
    if (!formData.email) return;
    setIsSaving(true);
    try {
      await saveDraftMutation.mutateAsync({ ...formData, token: token ?? undefined });
      await sendResumeLinkMutation.mutateAsync({ email: formData.email });
      setEmailSent(true);
    } catch (err) {
      console.error(err);
    }
    setIsSaving(false);
  };

  const handleSubmit = async () => {
    if (!token) return;
    setIsSaving(true);
    try {
      await saveDraftMutation.mutateAsync({ ...formData, token });
      await submitFinalMutation.mutateAsync({ token });
      router.push(`/application-status?token=${token}`);
    } catch (err) {
      console.error(err);
    }
    setIsSaving(false);
  };

  if (isLoadingDraft) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30">Restoring Draft</p>
      </div>
    );
  }

  if (emailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-md rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-12 text-center shadow-2xl backdrop-blur-xl"
      >
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(212,175,55,0.30)] bg-[rgba(212,175,55,0.05)]">
          <CheckCircle2 className="h-5 w-5 text-[rgba(212,175,55,0.7)]" />
        </div>
        <p className="text-[10px] tracking-widest uppercase text-foreground/35 mb-3">Draft Saved</p>
        <h2 className="font-heading text-foreground mb-4 text-2xl tracking-tight">Check Your Inbox</h2>
        <p className="text-foreground/50 mb-8 text-sm leading-relaxed">
          Resume link sent to <span className="text-foreground/80">{formData.email}</span>. Return anytime to continue.
        </p>
        <button
          onClick={() => router.push("/")}
          className="w-full border border-foreground/15 py-3 text-[9px] uppercase tracking-[0.3em] font-medium text-foreground/60 transition-all hover:border-foreground/30 hover:text-foreground/80"
        >
          Return to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl px-4 py-8">

      {/* Step Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-1">
            Stage {step} of {STEPS.length}
          </p>
          <h1 className="font-heading text-foreground text-3xl md:text-4xl tracking-tight">
            {STEPS[step - 1]?.label}
          </h1>
          <p className="mt-1 text-sm text-foreground/40">{STEPS[step - 1]?.sub}</p>
        </div>
        {step > 1 && (
          <button
            onClick={handleSaveAndExit}
            disabled={isSaving}
            className="mt-1 border border-foreground/10 px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-foreground/35 transition-all hover:border-foreground/20 hover:text-foreground/60 disabled:opacity-40"
          >
            {isSaving ? "Saving..." : "Save & Exit"}
          </button>
        )}
      </div>

      {/* Progress dots + connectors */}
      <div className="mb-12 flex items-center w-full">
        {STEPS.map((s, i) => {
          const idx = i + 1;
          const done = step > idx;
          const active = step === idx;
          const Icon = s.icon;
          return (
            <Fragment key={idx}>
              <div className="flex flex-col items-center relative z-10 shrink-0">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                  done
                    ? "border-[rgba(212,175,55,0.40)] bg-[rgba(212,175,55,0.05)]"
                    : active
                    ? "border-[rgba(212,175,55,0.55)] bg-[rgba(212,175,55,0.05)]"
                    : "border-foreground/10 bg-foreground/[0.02]"
                }`}
                  style={active ? { boxShadow: "0 0 12px rgba(212,175,55,0.10)" } : {}}
                >
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[rgba(212,175,55,0.7)]" />
                  ) : (
                    <Icon className={`h-3.5 w-3.5 ${active ? "text-[rgba(212,175,55,0.7)]" : "text-foreground/25"}`} />
                  )}
                </div>
                <span className={`mt-2 hidden absolute top-full w-24 text-center text-[9px] tracking-widest uppercase md:block ${
                  active ? "text-[rgba(212,175,55,0.6)]" : "text-foreground/25"
                }`}>
                  {s.label}
                </span>
              </div>
              
              {i < STEPS.length - 1 && (
                <div className="relative h-px flex-1 mx-2 sm:mx-4 bg-foreground/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[rgba(212,175,55,0.4)]"
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 shadow-2xl backdrop-blur-xl md:p-10">
        {/* Gold top line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.40) 50%, transparent 100%)" }}
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {step === 1 && (
              <div className="flex flex-col space-y-5">
                <FieldInput label="Full Name" value={formData.name || ""} onChange={(v) => updateField("name", v)} placeholder="Jane Doe" />
                <FieldInput label="Email Address" required type="email" value={formData.email} onChange={(v) => updateField("email", v)} placeholder="jane@startup.com" />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col space-y-5">
                <FieldInput label="Company Name" value={formData.companyName || ""} onChange={(v) => updateField("companyName", v)} placeholder="Acme Corp" />
                <FieldInput label="Website" type="url" value={formData.website || ""} onChange={(v) => updateField("website", v)} placeholder="https://acme.com" />
                <FieldInput label="Your Role" value={formData.role || ""} onChange={(v) => updateField("role", v)} placeholder="CEO / Co-Founder" />
                <div className="flex flex-col space-y-2">
                  <label className="text-xs tracking-[0.2em] uppercase text-foreground/40">Startup Stage</label>
                  <StyledSelect
                    value={formData.startupStage || ""}
                    onChange={(v) => updateField("startupStage", v)}
                    placeholder="Select your current stage"
                    options={[
                      { value: "Idea stage", label: "Idea stage — Exploring" },
                      { value: "MVP built", label: "MVP Built — Testing" },
                      { value: "Early users", label: "Early Users — Validating" },
                      { value: "Revenue generating", label: "Revenue Generating — Growing" },
                      { value: "Scaling", label: "Scaling — Expanding" },
                    ]}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col space-y-5">
                <FieldTextarea label="What are you building?" value={formData.buildingContext || ""} onChange={(v) => updateField("buildingContext", v)} placeholder="Describe the product and the customer problem it solves." hint="2–4 sentences" />
                <FieldTextarea label="Biggest current challenge" value={formData.currentChallenge || ""} onChange={(v) => updateField("currentChallenge", v)} placeholder="Distribution, fundraising, product-market fit, team…" />
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs tracking-[0.2em] uppercase text-foreground/40">Monthly Revenue / Traction</label>
                  <StyledSelect
                    value={formData.traction || ""}
                    onChange={(v) => updateField("traction", v)}
                    placeholder="Select your traction level"
                    options={[
                      { value: "No revenue yet", label: "No revenue yet" },
                      { value: "Under ₹50k", label: "Under ₹50k / month" },
                      { value: "₹50k – ₹5L", label: "₹50k – ₹5L / month" },
                      { value: "₹5L+", label: "₹5L+ / month" },
                    ]}
                  />
                </div>
                <FieldInput label="Team Size" value={formData.teamSize || ""} onChange={(v) => updateField("teamSize", v)} placeholder="e.g. 2 co-founders, 1 engineer" />
                <FieldTextarea label="Why TIC specifically?" value={formData.whyTic || ""} onChange={(v) => updateField("whyTic", v)} placeholder="What specifically drew you to The Incite Crew over other networks?" rows={3} hint="Be direct" />
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-foreground/40 leading-relaxed">
                  Which membership path resonates? This is a signal — the admin team makes the final tier assignment.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {TIER_DATA.map((tier) => {
                    const selected = formData.tierInterest === tier.name;
                    return (
                      <motion.div
                        key={tier.name}
                        onClick={() => updateField("tierInterest", tier.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                          selected
                            ? tier.gold
                              ? "bg-[rgba(212,175,55,0.05)] border-[rgba(212,175,55,0.40)]"
                              : "border-foreground/25 bg-foreground/[0.04]"
                            : "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20"
                        }`}
                        style={selected && tier.gold ? { boxShadow: "0 0 50px 8px rgba(212,175,55,0.10)" } : {}}
                      >
                        {/* Selected dot */}
                        <div className={`absolute right-4 top-4 h-2 w-2 rounded-full border transition-all ${
                          selected
                            ? tier.gold
                              ? "border-[rgba(212,175,55,0.8)] bg-[rgba(212,175,55,0.8)]"
                              : "border-foreground/60 bg-foreground/60"
                            : "border-foreground/20"
                        }`} />
                        <p className={`mb-1 text-[9px] font-medium tracking-widest uppercase ${
                          selected && tier.gold ? "text-[rgba(212,175,55,0.6)]" : "text-foreground/35"
                        }`}>{tier.tag}</p>
                        <h4 className="font-heading text-foreground text-lg">{tier.name}</h4>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/45">{tier.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex w-full items-center justify-between border-t border-foreground/10 pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || isSaving}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              step === 1 ? "invisible" : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSaving || 
                (step === 1 && !formData.email) ||
                (step === 2 && (!formData.name || !formData.companyName)) ||
                (step === 3 && ((formData.buildingContext?.length ?? 0) < 20 || (formData.currentChallenge?.length ?? 0) < 20)) ||
                (step === 4 && (!formData.traction || (formData.whyTic?.length ?? 0) < 20))
              }
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed dark:bg-transparent dark:text-foreground dark:border-2 dark:border-foreground/25 dark:hover:bg-foreground/10 dark:hover:border-foreground/50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="inline-flex items-center gap-2 border border-[rgba(212,175,55,0.40)] px-8 py-2.5 text-sm font-medium text-foreground transition-all hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
