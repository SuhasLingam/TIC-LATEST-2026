"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 z-[100] w-max max-w-[90vw] -translate-x-1/2"
      >
        <nav className="relative rounded-full px-6 py-3 shadow-xl">
          {/* Main Navbar Background and Blur decoupled to fix nested blur bug */}
          <div className="bg-background/80 absolute inset-0 -z-10 rounded-full backdrop-blur-xl"></div>
          {/* Glowing neon white top border fading into sides */}
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-full border-[1.5px] border-white"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 10%, transparent 60%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 10%, transparent 60%)",
              filter:
                "drop-shadow(0 0 6px rgba(255,255,255,1)) drop-shadow(0 0 20px rgba(255,255,255,0.8))",
            }}
          />
          <div className="relative z-10 flex min-w-max items-center gap-6 md:gap-8">
            <ul className="flex min-w-max items-center gap-6 md:gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "Membership", href: "/membership" },
                { name: "About Us", href: "/about" },
                {
                  name: "Verticals",
                  dropdown: [
                    { name: "Events", href: "/events" },
                    { name: "College", href: "/college" },
                    { name: "Services", href: "/services" },
                  ],
                },
              ].map((item) => {
                if (item.dropdown) {
                  const isDropdownActive = item.dropdown.some(
                    (d) => pathname === d.href,
                  );
                  return (
                    <li
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name,
                          )
                        }
                        className={`flex items-center gap-1 py-1 font-sans text-xs tracking-wide transition-colors duration-300 ${
                          isDropdownActive || openDropdown === item.name
                            ? "text-foreground font-medium"
                            : "text-foreground/50 hover:text-foreground"
                        }`}
                      >
                        {item.name}
                        <svg
                          className={`h-3 w-3 transition-opacity duration-300 ${openDropdown === item.name ? "opacity-100" : "opacity-50"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <div
                        className={`absolute top-full right-0 left-0 z-[999] mt-3 flex justify-center transition-all duration-300 ease-out ${
                          openDropdown === item.name
                            ? "pointer-events-auto visible opacity-100"
                            : "pointer-events-none invisible opacity-0"
                        }`}
                      >
                        {/* Invisible bridge */}
                        <div className="absolute -top-3 right-0 left-0 h-3 bg-transparent"></div>

                        <div className="bg-background/80 border-foreground/10 flex min-w-[120px] flex-col rounded-2xl border px-1.5 py-1.5 shadow-2xl backdrop-blur-xl">
                          {item.dropdown.map((dropItem) => {
                            const isDropActive = pathname === dropItem.href;
                            return (
                              <Link
                                key={dropItem.name}
                                href={dropItem.href}
                                className={`rounded-xl px-4 py-2 text-center font-sans text-xs tracking-wide transition-colors duration-200 ${
                                  isDropActive
                                    ? "text-foreground bg-foreground/5 font-medium"
                                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                                }`}
                              >
                                {dropItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block py-1 font-sans text-xs tracking-wide transition-colors duration-300 ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-foreground/50 hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Auth nav item */}
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="text-foreground/50 hover:text-foreground py-1 font-sans text-xs tracking-wide transition-colors duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={`block py-1 font-sans text-xs tracking-wide transition-colors duration-300 ${
                  pathname === "/login"
                    ? "text-foreground font-medium"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
