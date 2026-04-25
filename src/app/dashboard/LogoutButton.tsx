"use client";

import { logout } from "~/app/actions/auth";

import { LogOut } from "lucide-react";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={logout} className="w-full">
      <button
        type="submit"
        className={className ?? "text-foreground/40 hover:text-foreground font-sans text-[9px] tracking-[0.3em] uppercase transition-colors"}
      >
        {className && <LogOut className="h-3 w-3" />}
        Sign Out
      </button>
    </form>
  );
}
