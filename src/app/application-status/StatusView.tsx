"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";

export function StatusView() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { data: appData, isLoading, error } = api.application.getByToken.useQuery(
    { token: token! },
    { enabled: !!token, retry: false }
  );

  const sendResumeLinkMutation = api.application.sendResumeLink.useMutation();

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSending(true);
    try {
      await sendResumeLinkMutation.mutateAsync({ email: emailInput });
      setEmailSent(true);
    } catch (err) {
      console.error(err);
      alert("No application found with that email address.");
    }
    setIsSending(false);
  };

  // State 1: Loading
  if (token && isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Loader2 className="text-foreground/50 h-8 w-8 animate-spin" />
      </div>
    );
  }

  // State 2: No token, request email
  if (!token || error) {
    if (emailSent) {
      return (
        <div className="bg-foreground/[0.02] border-foreground/10 mx-auto w-full max-w-md rounded-2xl border p-10 text-center shadow-sm">
          <h2 className="font-heading text-foreground mb-4 text-2xl tracking-tight">Check your inbox</h2>
          <p className="text-foreground/60 mb-6 text-sm leading-relaxed">
            We have sent a secure link to your email to check your application status.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-foreground/[0.02] border-foreground/10 mx-auto w-full max-w-md rounded-2xl border p-10 text-center shadow-sm">
        <h2 className="font-heading text-foreground mb-4 text-2xl tracking-tight">Application Status</h2>
        <p className="text-foreground/60 mb-8 text-sm leading-relaxed">
          Enter the email address you applied with to retrieve your specific application status link.
        </p>
        <form onSubmit={handleSendLink} className="flex flex-col space-y-4">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="founder@startup.com"
            required
            className="bg-transparent border-foreground/20 text-foreground focus:border-foreground/50 w-full rounded-lg border px-4 py-3 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isSending || !emailInput}
            className="bg-foreground text-background flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Link"}
          </button>
        </form>
      </div>
    );
  }

  // State 3: Token data found
  if (appData) {
    if (appData.status === "draft") {
      return (
        <div className="bg-foreground/[0.02] border-foreground/10 mx-auto w-full max-w-lg rounded-2xl border p-10 text-center shadow-sm">
          <span className="bg-foreground/5 text-foreground/50 mb-6 inline-block rounded-full px-3 py-1 text-xs tracking-widest uppercase">
            Incomplete
          </span>
          <h2 className="font-heading text-foreground mb-4 text-2xl tracking-tight">Application Draft</h2>
          <p className="text-foreground/60 mb-8 text-sm leading-relaxed">
            Your application is currently saved as a draft and has not been submitted yet.
          </p>
          <button
            onClick={() => router.push(`/apply?token=${token}`)}
            className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-transform hover:scale-[1.02]"
          >
            Resume Application <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      );
    }

    if (appData.status === "pending") {
      return (
        <div className="bg-foreground/[0.02] border-foreground/10 mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border p-12 text-center shadow-xl">
          <div className="bg-foreground/5 text-foreground/60 mb-8 flex h-20 w-20 items-center justify-center rounded-full">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight mb-4">Under Review</h2>
          <p className="text-foreground/60 mb-8 max-w-sm text-sm leading-relaxed mx-auto">
            Your application for the <strong>{appData.tierInterest ?? "network"}</strong> is currently being reviewed by our team. 
          </p>
          <div className="border-foreground/10 bg-foreground/5 w-full rounded-xl border p-5">
            <p className="text-foreground/70 text-xs tracking-widest uppercase mb-1">Standard SLA</p>
            <p className="text-foreground/90 font-medium">48 &ndash; 72 Hours</p>
          </div>
          <p className="text-foreground/40 mt-8 text-xs max-w-xs mx-auto">
            You will receive an email update automatically once a decision is made.
          </p>
        </div>
      );
    }

    if (appData.status === "accepted") {
      return (
        <div className="bg-foreground/[0.02] border-foreground/10 mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border p-12 text-center shadow-xl">
          <div className="bg-[rgba(212,175,55,0.1)] text-[rgba(212,175,55,0.9)] mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight mb-4">Application Approved</h2>
          <p className="text-foreground/60 mb-8 max-w-sm text-sm leading-relaxed mx-auto">
            Welcome. You have been selected for the <strong>{appData.assignedTier ?? appData.tierInterest}</strong> at The Incite Crew.
          </p>
          <button
            onClick={() => router.push(`/activate-membership?token=${token}`)}
            className="bg-[rgba(212,175,55,0.9)] text-black inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold transition-transform hover:scale-[1.03]"
          >
            Activate Your Membership <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      );
    }
    
    // Add caught status block just in case
    return (
      <div className="text-center">
        <p className="text-foreground/60">Status: {appData.status}</p>
      </div>
    );
  }

  return null;
}
