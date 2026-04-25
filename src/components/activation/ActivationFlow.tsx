"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "~/utils/supabase/client";
import { api } from "~/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, Sparkles, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "auth-email" | "auth-otp" | "confirm" | "payment" | "success";

// 8-box OTP input — theme-adaptive
function OTPInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(8, " ").split("").slice(0, 8);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = digits.map((d, idx) => (idx === i ? " " : d)).join("").trimEnd();
      onChange(next.replace(/ /g, ""));
      if (i > 0) inputs.current[i - 1]?.focus();
    }
  };

  const handleChange = (i: number, v: string) => {
    const char = v.replace(/\D/g, "").slice(-1);
    if (!char) return;
    const next = digits.map((d, idx) => (idx === i ? char : d === " " ? "" : d)).join("");
    onChange(next.replace(/ /g, ""));
    if (i < 7) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 8);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 7)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const filled = digits[i] && digits[i] !== " ";
        return (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={filled ? digits[i] : ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            className={`h-12 w-10 border text-center text-lg font-mono font-bold outline-none transition-all duration-200 ${
              filled
                ? "border-[rgba(212,175,55,0.55)] bg-[rgba(212,175,55,0.05)] text-foreground"
                : "border-foreground/10 bg-foreground/[0.03] text-foreground/80 focus:border-foreground/30"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ActivationFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const token = searchParams.get("token") ?? undefined;

  const [step, setStep] = useState<Step>("auth-email");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const activateProfileMutation = api.profile.activateProfile.useMutation();
  const { data: appData, isLoading: isLoadingApp, error: appError } = api.application.getByToken.useQuery(
    { token },
    { enabled: !!token, retry: false }
  );

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const email = appData?.email ?? "";
  const tier = appData?.assignedTier ?? appData?.tierInterest ?? "Explorer";

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setStep("auth-otp");
      setResendCooldown(30);
    } catch (err: any) {
      alert(err.message || "Failed to send code.");
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 8) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
      if (error) throw error;
      if (data.user) {
        setAuthUserId(data.user.id);
        setStep("confirm");
      }
    } catch (err: any) {
      alert(err.message || "Invalid code.");
    }
    setIsLoading(false);
  };

  const handlePaymentAndActivate = async () => {
    if (!authUserId || !token) return;
    setIsLoading(true);
    try {
      await activateProfileMutation.mutateAsync({ token });
      setStep("success");
    } catch (err: any) {
      alert(err.message || "Failed to activate profile.");
    }
    setIsLoading(false);
  };

  const stepVariant = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12">
        <p className="text-[10px] tracking-widest uppercase text-foreground/35 mb-2">Error</p>
        <h2 className="font-heading text-foreground mb-4 text-2xl tracking-tight">Invalid Link</h2>
        <p className="text-sm text-foreground/50">Please use the secure activation link sent to your email.</p>
      </div>
    );
  }

  if (isLoadingApp) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30">Validating Token</p>
      </div>
    );
  }

  if (appError || !appData) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12">
        <p className="text-[10px] tracking-widest uppercase text-[rgba(212,175,55,0.6)] mb-2">Security Warning</p>
        <h2 className="font-heading text-foreground mb-4 text-2xl tracking-tight">Token Invalid or Expired</h2>
        <p className="text-sm text-foreground/50">This activation link is no longer valid. Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand mark */}
      <div className="mb-8 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/35">The Incite Crew</p>
        <div className="mt-2 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>

      <AnimatePresence mode="wait">

        {/* STEP 1: Email */}
        {step === "auth-email" && (
          <motion.div key="email" variants={stepVariant} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.40), transparent)" }} />

              <div className="mb-6 flex h-10 w-10 items-center justify-center border border-foreground/10 bg-foreground/[0.03]">
                <ShieldCheck className="h-4 w-4 text-[rgba(212,175,55,0.7)]" />
              </div>

              <p className="text-[10px] tracking-widest uppercase text-foreground/35 mb-2">Membership Activation</p>
              <h2 className="font-heading text-foreground mb-2 text-2xl tracking-tight">Verify Your Identity</h2>
              <p className="mb-8 text-sm leading-relaxed text-foreground/50">
                Enter the email you used when applying. We'll send a one-time code.
              </p>

              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm text-foreground/50 focus:outline-none opacity-80 cursor-not-allowed transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-40 dark:bg-transparent dark:text-foreground dark:border-2 dark:border-foreground/25 dark:hover:bg-foreground/10 dark:hover:border-foreground/50"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send Code <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* STEP 2: OTP */}
        {step === "auth-otp" && (
          <motion.div key="otp" variants={stepVariant} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.40), transparent)" }} />

              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center border border-[rgba(212,175,55,0.30)] bg-[rgba(212,175,55,0.05)]">
                  <ShieldCheck className="h-4 w-4 text-[rgba(212,175,55,0.7)]" />
                </div>
                <p className="text-[10px] tracking-widest uppercase text-foreground/35 mb-1">Verification Code</p>
                <h2 className="font-heading text-foreground mb-2 text-2xl tracking-tight">Enter Your Code</h2>
                <p className="text-sm text-foreground/45">
                  Sent to <span className="text-foreground/70">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                <OTPInput value={otp} onChange={setOtp} />

                <button
                  type="submit"
                  disabled={isLoading || otp.length < 8}
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-40 dark:bg-transparent dark:text-foreground dark:border-2 dark:border-foreground/25 dark:hover:bg-foreground/10 dark:hover:border-foreground/50"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Continue"}
                </button>

                <div className="flex items-center justify-between text-xs text-foreground/30">
                  <button type="button" onClick={() => setStep("auth-email")} className="hover:text-foreground/60 transition-colors">
                    ← Back
                  </button>
                  {resendCooldown > 0 ? (
                    <span>Resend in {resendCooldown}s</span>
                  ) : (
                    <button type="button" onClick={handleSendOtp} className="hover:text-foreground/60 transition-colors">
                      Resend code
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Confirm Profile */}
        {step === "confirm" && (
          <motion.div key="confirm" variants={stepVariant} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.40), transparent)" }} />

              {isLoadingApp ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
                  <p className="text-[10px] tracking-widest uppercase text-foreground/30">Validating status…</p>
                </div>
              ) : appData?.status !== "approved" ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-foreground/50">Application not approved yet.</p>
                  <p className="mt-2 text-xs text-foreground/30">Current status: <span className="text-foreground/50">{appData?.status ?? "Not found"}</span></p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[10px] tracking-widest uppercase text-[rgba(212,175,55,0.6)] mb-1">Application Accepted</p>
                    <h2 className="font-heading text-foreground text-2xl tracking-tight">Confirm Your Profile</h2>
                    <p className="mt-1 text-sm text-foreground/45">Verify your details before activating your {tier} membership.</p>
                  </div>

                  <div className="mb-6 space-y-0 border border-foreground/10 bg-foreground/[0.02]">
                    {[
                      { label: "Name",       val: appData.name },
                      { label: "Company",    val: appData.companyName },
                      { label: "Role",       val: appData.role },
                      { label: "Membership", val: tier, gold: true },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-foreground/[0.06] last:border-0">
                        <span className="text-[10px] uppercase tracking-widest text-foreground/35">{row.label}</span>
                        <span className={`text-sm ${row.gold ? "text-[rgba(212,175,55,0.8)] font-medium" : "text-foreground/70"}`}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep("payment")}
                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98] dark:bg-transparent dark:text-foreground dark:border-2 dark:border-foreground/25 dark:hover:bg-foreground/10 dark:hover:border-foreground/50"
                  >
                    Confirm & Continue <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 4: Payment */}
        {step === "payment" && (
          <motion.div key="payment" variants={stepVariant} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.40), transparent)" }} />

              <div className="border-b border-foreground/[0.06] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-foreground/35" />
                  <span className="font-heading text-foreground text-lg">Payment</span>
                </div>
                <span className="text-[9px] tracking-widest uppercase text-foreground/30">Secure Checkout</span>
              </div>

              <div className="p-6 space-y-5">
                {/* Order summary */}
                <div className="border border-[rgba(212,175,55,0.30)] bg-[rgba(212,175,55,0.04)] p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/80">{tier} Membership</p>
                    <p className="text-[10px] text-foreground/35 mt-0.5 tracking-wide">Annual commitment, billed monthly</p>
                  </div>
                  <p className="font-heading text-xl text-[rgba(212,175,55,0.8)]">
                    {tier === "Trailblazer" ? "₹ 2,49,999" : tier === "Visionary" ? "₹ 99,999" : "₹ 24,999"}
                  </p>
                </div>

                {/* Mock payment card UI */}
                <div className="relative border border-foreground/[0.06] bg-foreground/[0.02] p-5 overflow-hidden">
                  <div className="opacity-20 pointer-events-none flex flex-col gap-3">
                    <div className="h-9 border border-foreground/10 flex items-center px-3 gap-2">
                      <div className="w-8 h-5 bg-foreground/10" />
                      <div className="h-2 w-36 bg-foreground/10" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-9 border border-foreground/10" />
                      <div className="h-9 border border-foreground/10" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="border border-foreground/10 bg-foreground/[0.04] px-4 py-2">
                      <p className="text-[9px] tracking-widest uppercase text-foreground/40">Mock Integration Active</p>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-[rgba(212,175,55,0.8)]" readOnly />
                  <span className="text-xs leading-relaxed text-foreground/40">
                    I agree to the{" "}
                    <span className="underline text-foreground/60">Terms of Membership</span> and{" "}
                    <span className="underline text-foreground/60">Community Code of Conduct</span>.
                  </span>
                </label>

                <button
                  onClick={handlePaymentAndActivate}
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 border border-[rgba(212,175,55,0.40)] px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShieldCheck className="h-4 w-4 text-[rgba(212,175,55,0.7)]" /> Pay & Activate Account</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Success */}
        {step === "success" && (
          <motion.div key="success" variants={stepVariant} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-10 text-center shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.40), transparent)" }} />

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-[rgba(212,175,55,0.30)] bg-[rgba(212,175,55,0.05)]"
                style={{ boxShadow: "0 0 50px 8px rgba(212,175,55,0.10)" }}
              >
                <Sparkles className="h-6 w-6 text-[rgba(212,175,55,0.8)]" />
              </motion.div>

              <p className="text-[10px] tracking-widest uppercase text-[rgba(212,175,55,0.6)] mb-3">Access Granted</p>
              <h2 className="font-heading text-foreground mb-2 text-3xl tracking-tight">Welcome In.</h2>
              <p className="text-sm text-foreground/40 leading-relaxed mb-4">{tier} Member</p>
              <p className="mb-10 text-sm leading-relaxed text-foreground/50 max-w-sm mx-auto">
                Your profile is active. Your execution board is being initialized.
              </p>

              <button
                onClick={() => router.push("/dashboard")}
                className="group inline-flex w-full items-center justify-center gap-2 border border-[rgba(212,175,55,0.40)] px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)] hover:scale-[1.02]"
              >
                Enter Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
