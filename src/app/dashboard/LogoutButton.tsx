"use client";

import { logout } from "~/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="font-sans text-[9px] uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
