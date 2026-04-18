"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "~/trpc/react";
import { X, CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

interface ApplicationFormProps {
  onClose: () => void;
  defaultTier?: "Explorer" | "Visionary" | "Trailblazer";
}

interface ApplicationFormData {
  name: string;
  email: string;
  mobileNumber: string;
  startupName: string;
  website: string;
  pitchDeck: string;
  overview: string;
  founderStage:
    | "Idea stage"
    | "MVP built"
    | "Early users"
    | "Revenue generating"
    | "Scaling";
  primaryGoal:
    | "Product strategy"
    | "Growth help"
    | "Fundraising"
    | "Network access"
    | "Accountability / execution support";
  monthlyRevenue: "No revenue yet" | "Under ₹50k" | "₹50k – ₹5L" | "₹5L+";
  tier: "Explorer" | "Visionary" | "Trailblazer";
}

export function ApplicationForm({
  onClose,
  defaultTier = "Explorer",
}: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    email: "",
    mobileNumber: "",
    startupName: "",
    website: "",
    pitchDeck: "",
    overview: "",
    founderStage: "Idea stage",
    primaryGoal: "Product strategy",
    monthlyRevenue: "No revenue yet",
    tier: defaultTier,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitApplication = api.application.submit.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    await submitApplication.mutateAsync(formData);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="font-heading text-foreground mb-4 text-3xl font-medium">
          Application Received
        </h3>
        <p className="text-foreground/60 mb-8 max-w-sm font-sans leading-relaxed">
          We&apos;ve received your application. The Incite Crew reviews every
          application manually to ensure a perfect fit. We&apos;ll be in touch
          soon.
        </p>
        <button
          onClick={onClose}
          className="text-foreground font-sans text-sm font-medium transition-opacity hover:opacity-70"
        >
          Close Window
        </button>
      </motion.div>
    );
  }

  // Step descriptions
  const stepTitles = ["Founder Details", "Startup Profile", "Business Details"];

  return (
    <div
      className="relative mx-auto flex w-full max-w-2xl flex-col justify-between p-5 md:p-8"
      style={{ minHeight: "500px" }}
    >
      <button
        onClick={onClose}
        className="text-foreground/40 hover:text-foreground absolute top-5 right-5 z-10 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div>
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-foreground/60 text-xs font-medium tracking-[0.2em] uppercase">
              Step {step} of 3 — {stepTitles[step - 1]}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="bg-foreground/10 mt-2 h-1 w-full">
            <motion.div
              className="bg-foreground h-full"
              initial={{ width: `${((step - 1) / 3) * 100}%` }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form
          id="application-form"
          onSubmit={handleSubmit}
          className="relative min-h-[300px]"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h2 className="font-heading mb-6 text-2xl font-medium">
                  About You
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileNumber: e.target.value })
                    }
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h2 className="font-heading mb-6 text-2xl font-medium">
                  About Your Startup
                </h2>
                <div className="space-y-1">
                  <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                    Startup / Project Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Inc."
                    className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                    value={formData.startupName}
                    onChange={(e) =>
                      setFormData({ ...formData, startupName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                      Website or Product Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                      Pitch Deck Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://docsend.com/..."
                      className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                      value={formData.pitchDeck}
                      onChange={(e) =>
                        setFormData({ ...formData, pitchDeck: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                    Project / Startup Overview
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe what you're building..."
                    className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full resize-none rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                    value={formData.overview}
                    onChange={(e) =>
                      setFormData({ ...formData, overview: e.target.value })
                    }
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h2 className="font-heading mb-6 text-2xl font-medium">
                  Business & Goals
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                      Stage of Founder
                    </label>
                    <select
                      required
                      className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full appearance-none rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                      value={formData.founderStage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          founderStage: e.target
                            .value as ApplicationFormData["founderStage"],
                        })
                      }
                    >
                      <option
                        value="Idea stage"
                        className="text-black dark:text-black"
                      >
                        Idea stage
                      </option>
                      <option
                        value="MVP built"
                        className="text-black dark:text-black"
                      >
                        MVP built
                      </option>
                      <option
                        value="Early users"
                        className="text-black dark:text-black"
                      >
                        Early users
                      </option>
                      <option
                        value="Revenue generating"
                        className="text-black dark:text-black"
                      >
                        Revenue generating
                      </option>
                      <option
                        value="Scaling"
                        className="text-black dark:text-black"
                      >
                        Scaling
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                      Monthly Revenue (Optional)
                    </label>
                    <select
                      className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full appearance-none rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                      value={formData.monthlyRevenue}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          monthlyRevenue: e.target
                            .value as ApplicationFormData["monthlyRevenue"],
                        })
                      }
                    >
                      <option
                        value="No revenue yet"
                        className="text-black dark:text-black"
                      >
                        No revenue yet
                      </option>
                      <option
                        value="Under ₹50k"
                        className="text-black dark:text-black"
                      >
                        Under ₹50k
                      </option>
                      <option
                        value="₹50k – ₹5L"
                        className="text-black dark:text-black"
                      >
                        ₹50k – ₹5L
                      </option>
                      <option
                        value="₹5L+"
                        className="text-black dark:text-black"
                      >
                        ₹5L+
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                    Primary Goal for Joining TIC
                  </label>
                  <select
                    required
                    className="bg-foreground/[0.03] border-foreground/10 focus:border-foreground/30 w-full appearance-none rounded-none border px-3 py-3 text-sm transition-colors focus:outline-none"
                    value={formData.primaryGoal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        primaryGoal: e.target
                          .value as ApplicationFormData["primaryGoal"],
                      })
                    }
                  >
                    <option
                      value="Product strategy"
                      className="text-black dark:text-black"
                    >
                      Product strategy
                    </option>
                    <option
                      value="Growth help"
                      className="text-black dark:text-black"
                    >
                      Growth help
                    </option>
                    <option
                      value="Fundraising"
                      className="text-black dark:text-black"
                    >
                      Fundraising
                    </option>
                    <option
                      value="Network access"
                      className="text-black dark:text-black"
                    >
                      Network access
                    </option>
                    <option
                      value="Accountability / execution support"
                      className="text-black dark:text-black"
                    >
                      Accountability / execution support
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-foreground/60 text-[9px] font-medium tracking-widest uppercase">
                    Desired Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Explorer", "Visionary", "Trailblazer"].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            tier: tier as
                              | "Explorer"
                              | "Visionary"
                              | "Trailblazer",
                          })
                        }
                        className={`border py-3 text-[9px] tracking-widest uppercase transition-all ${
                          formData.tier === tier
                            ? "border-transparent bg-black text-white dark:bg-white dark:text-black"
                            : "text-foreground/60 border-foreground/10 hover:border-foreground/30 bg-transparent"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Navigation Buttons */}
      <div className="border-foreground/10 mt-8 flex gap-4 border-t pt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="border-foreground/20 hover:border-foreground/40 group flex flex-1 items-center justify-center gap-2 border py-3 text-[9px] font-medium tracking-[0.3em] uppercase transition-all"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
        )}
        <button
          disabled={submitApplication.isPending}
          type="submit"
          form="application-form"
          className="group flex flex-[2] items-center justify-center gap-2 bg-black py-3 text-[9px] font-medium tracking-[0.3em] text-white uppercase transition-all hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {submitApplication.isPending ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {step < 3 ? "Next Step" : "Submit Application"}
              {step < 3 ? (
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              ) : (
                <CheckCircle2 className="h-3 w-3" />
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
