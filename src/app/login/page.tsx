"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendAuthOtp, verifyAuthOtp } from "~/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (!email) { setError("Please enter your email."); return; }
    setError(null);
    setIsLoading(true);
    const result = await sendAuthOtp(email);
    setIsLoading(false);
    if (result.error) setError(result.error);
    else setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 8) return;
    setError(null);
    setIsLoading(true);
    const result = await verifyAuthOtp(email, otp);
    setIsLoading(false);
    if (result.error) setError("Invalid or expired code. Please try again.");
    else router.push("/dashboard");
  };

  const inputCls =
    "w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-4 py-3 text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors";

  const primaryBtnCls =
    "w-full rounded-full px-6 py-2.5 text-[9px] uppercase tracking-[0.3em] font-sans font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed bg-foreground text-white dark:bg-transparent dark:text-foreground dark:border dark:border-foreground/30 dark:hover:bg-foreground/10 dark:hover:border-foreground/60";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      {/* Subtle bg glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[400px] bg-foreground/[0.03] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Eyebrow */}
        <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/35 mb-8">
          Member Access
        </p>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/20 bg-red-500/5 text-red-500 dark:text-red-400 font-sans text-xs">
            {error}
          </div>
        )}

        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-2 tracking-tight">
              Welcome back.
            </h1>
            <p className="font-sans text-sm text-foreground/50 mb-10">
              Enter your email to receive a login code.
            </p>

            <div className="mb-5">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                className={inputCls}
                autoFocus
              />
            </div>

            <button onClick={handleSendOtp} disabled={isLoading} className={primaryBtnCls}>
              {isLoading ? "Sending..." : "Send Login Code"}
            </button>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-2 tracking-tight">
              Check your email.
            </h1>
            <p className="font-sans text-sm text-foreground/50 mb-10">
              We sent an 8-digit code to{" "}
              <span className="text-foreground font-medium">{email}</span>.
            </p>

            <div className="mb-5">
              <input
                type="text"
                inputMode="numeric"
                placeholder="00000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-4 py-5 text-center tracking-[0.5em] text-2xl font-heading text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground/30 transition-colors"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length < 8}
                className={primaryBtnCls}
              >
                {isLoading ? "Verifying..." : "Sign In"}
              </button>

              <button
                onClick={() => { setStep("email"); setOtp(""); setError(null); }}
                className="w-full font-sans text-[9px] uppercase tracking-[0.3em] text-foreground/30 hover:text-foreground transition-colors py-2"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="font-sans text-xs text-foreground/30 text-center">
            Not a member yet?{" "}
            <a href="/membership" className="text-foreground/60 hover:text-foreground transition-colors underline underline-offset-2">
              Explore membership
            </a>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
