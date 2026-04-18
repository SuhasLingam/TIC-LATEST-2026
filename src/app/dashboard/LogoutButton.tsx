"use client";

import { logout } from "~/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-foreground/40 hover:text-foreground font-sans text-[9px] tracking-[0.3em] uppercase transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
