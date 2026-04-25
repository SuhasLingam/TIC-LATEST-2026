"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function ClientNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  
  // Hide navbar on dashboard and potentially other admin/app routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return <Navbar isLoggedIn={isLoggedIn} />;
}
