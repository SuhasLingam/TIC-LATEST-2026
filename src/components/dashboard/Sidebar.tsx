"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Zap,
  Target,
  Calendar,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "~/app/dashboard/LogoutButton";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Matrix", href: "/dashboard" },
  { icon: Target, label: "Insights", href: "/dashboard/insights" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
  { icon: Zap, label: "Perks", href: "/dashboard/perks" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export function Sidebar({ profile }: { profile: any }) {
  const pathname = usePathname();

  return (
    <div className="dash-sidebar w-60 shrink-0 flex flex-col">
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 group ${
                active
                  ? "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-900 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? "text-amber-500 dark:text-amber-400" : "text-current"
                  }`}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  {item.label}
                </span>
              </div>
              {active && (
                <motion.div layoutId="sidebar-active">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile Footer */}
      <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 p-4">
        <div className="flex items-center gap-3 mb-4">
          {profile.selectedCardId ? (
            <img 
              src={`/cards/${profile.selectedCardId}`} 
              className="h-9 w-6 object-cover rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-sm"
              alt="Avatar"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
              {profile.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <div className="overflow-hidden min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
              {profile.fullName}
            </p>
            <p className="truncate text-[9px] tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              {profile.tier ?? "Member"}
            </p>
          </div>
        </div>

        <LogoutButton className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 transition-all hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400" />
      </div>
    </div>
  );
}
