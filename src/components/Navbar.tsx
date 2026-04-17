"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90vw]"
      >
        <nav className="relative rounded-full bg-background/80 backdrop-blur-xl px-6 py-3 shadow-xl">
          {/* Glowing neon white top border fading into sides */}
          <div
            className="absolute inset-0 rounded-full border-[1.5px] border-white z-0 pointer-events-none"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 10%, transparent 60%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 10%, transparent 60%)",
              filter: "drop-shadow(0 0 6px rgba(255,255,255,1)) drop-shadow(0 0 20px rgba(255,255,255,0.8))"
            }}
          />
          <ul className="relative z-10 flex items-center gap-6 md:gap-8 min-w-max">
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
                ]
              }
            ].map((item) => {
              if (item.dropdown) {
                const isDropdownActive = item.dropdown.some((d) => pathname === d.href);
                return (
                  <li key={item.name} className="relative group">
                    <button
                      className={`font-sans text-xs tracking-wide transition-colors duration-300 flex items-center gap-1 py-1 ${isDropdownActive
                          ? "text-foreground font-medium"
                          : "text-foreground/50 hover:text-foreground"
                        }`}
                    >
                      {item.name}
                      <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-[999]">
                      {/* Invisible bridge */}
                      <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent"></div>

                      <div className="bg-background/90 backdrop-blur-xl rounded-2xl shadow-xl py-1.5 px-1.5 flex flex-col min-w-[120px]">
                        {item.dropdown.map((dropItem) => {
                          const isDropActive = pathname === dropItem.href;
                          return (
                            <Link
                              key={dropItem.name}
                              href={dropItem.href}
                              className={`font-sans text-xs tracking-wide px-4 py-2 rounded-xl transition-colors duration-200 text-center ${isDropActive
                                  ? "text-foreground font-medium bg-foreground/5"
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
                    className={`font-sans text-xs tracking-wide transition-colors duration-300 py-1 block ${isActive
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
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
