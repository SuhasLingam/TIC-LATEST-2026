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
    founderStage: "Idea stage" | "MVP built" | "Early users" | "Revenue generating" | "Scaling";
    primaryGoal: "Product strategy" | "Growth help" | "Fundraising" | "Network access" | "Accountability / execution support";
    monthlyRevenue: "No revenue yet" | "Under ₹50k" | "₹50k – ₹5L" | "₹5L+";
    tier: "Explorer" | "Visionary" | "Trailblazer";
}

export function ApplicationForm({ onClose, defaultTier = "Explorer" }: ApplicationFormProps) {
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
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-heading text-3xl font-medium mb-4 text-foreground">Application Received</h3>
                <p className="font-sans text-foreground/60 max-w-sm mb-8 leading-relaxed">
                    We&apos;ve received your application. The Incite Crew reviews every application manually to ensure a perfect fit. We&apos;ll be in touch soon.
                </p>
                <button
                    onClick={onClose}
                    className="font-sans text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                >
                    Close Window
                </button>
            </motion.div>
        );
    }

    // Step descriptions
    const stepTitles = ["Founder Details", "Startup Profile", "Business Details"];

    return (
        <div className="relative p-5 md:p-8 w-full max-w-2xl mx-auto flex flex-col justify-between" style={{ minHeight: "500px" }}>
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-foreground/40 hover:text-foreground transition-colors z-10"
            >
                <X className="w-5 h-5" />
            </button>

            <div>
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs tracking-[0.2em] uppercase text-foreground/60 font-medium">
                            Step {step} of 3 — {stepTitles[step - 1]}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-foreground/10 h-1 mt-2">
                        <motion.div
                            className="h-full bg-foreground"
                            initial={{ width: `${((step - 1) / 3) * 100}%` }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <form id="application-form" onSubmit={handleSubmit} className="relative min-h-[300px]">
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
                                <h2 className="font-heading text-2xl font-medium mb-6">About You</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Mobile Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                        value={formData.mobileNumber}
                                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
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
                                <h2 className="font-heading text-2xl font-medium mb-6">About Your Startup</h2>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Startup / Project Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Acme Inc."
                                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                        value={formData.startupName}
                                        onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Website or Product Link</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com"
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Pitch Deck Link (Optional)</label>
                                        <input
                                            type="url"
                                            placeholder="https://docsend.com/..."
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                            value={formData.pitchDeck}
                                            onChange={(e) => setFormData({ ...formData, pitchDeck: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Project / Startup Overview</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Briefly describe what you're building..."
                                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                                        value={formData.overview}
                                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
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
                                <h2 className="font-heading text-2xl font-medium mb-6">Business & Goals</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Stage of Founder</label>
                                        <select
                                            required
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors appearance-none"
                                            value={formData.founderStage}
                                            onChange={(e) => setFormData({ ...formData, founderStage: e.target.value as ApplicationFormData["founderStage"] })}
                                        >
                                            <option value="Idea stage" className="text-black dark:text-black">Idea stage</option>
                                            <option value="MVP built" className="text-black dark:text-black">MVP built</option>
                                            <option value="Early users" className="text-black dark:text-black">Early users</option>
                                            <option value="Revenue generating" className="text-black dark:text-black">Revenue generating</option>
                                            <option value="Scaling" className="text-black dark:text-black">Scaling</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Monthly Revenue (Optional)</label>
                                        <select
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors appearance-none"
                                            value={formData.monthlyRevenue}
                                            onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value as ApplicationFormData["monthlyRevenue"] })}
                                        >
                                            <option value="No revenue yet" className="text-black dark:text-black">No revenue yet</option>
                                            <option value="Under ₹50k" className="text-black dark:text-black">Under ₹50k</option>
                                            <option value="₹50k – ₹5L" className="text-black dark:text-black">₹50k – ₹5L</option>
                                            <option value="₹5L+" className="text-black dark:text-black">₹5L+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Primary Goal for Joining TIC</label>
                                    <select
                                        required
                                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors appearance-none"
                                        value={formData.primaryGoal}
                                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value as ApplicationFormData["primaryGoal"] })}
                                    >
                                        <option value="Product strategy" className="text-black dark:text-black">Product strategy</option>
                                        <option value="Growth help" className="text-black dark:text-black">Growth help</option>
                                        <option value="Fundraising" className="text-black dark:text-black">Fundraising</option>
                                        <option value="Network access" className="text-black dark:text-black">Network access</option>
                                        <option value="Accountability / execution support" className="text-black dark:text-black">Accountability / execution support</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-foreground/60 font-medium">Desired Tier</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["Explorer", "Visionary", "Trailblazer"].map((tier) => (
                                            <button
                                                key={tier}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, tier: tier as "Explorer" | "Visionary" | "Trailblazer" })}
                                                className={`py-3 text-[9px] uppercase tracking-widest border transition-all ${formData.tier === tier
                                                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                                                    : "bg-transparent text-foreground/60 border-foreground/10 hover:border-foreground/30"
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
            <div className="mt-8 flex gap-4 pt-4 border-t border-foreground/10">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3 text-[9px] uppercase tracking-[0.3em] font-medium border border-foreground/20 hover:border-foreground/40 transition-all flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>
                )}
                <button
                    disabled={submitApplication.isPending}
                    type="submit"
                    form="application-form"
                    className="flex-[2] bg-black text-white dark:bg-white dark:text-black py-3 uppercase text-[9px] tracking-[0.3em] font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {submitApplication.isPending ? (
                        <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            {step < 3 ? "Next Step" : "Submit Application"}
                            {step < 3 ? <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> : <CheckCircle2 className="w-3 h-3" />}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
