"use client";

import { useEffect, useRef } from "react";
import { createClient } from "~/utils/supabase/client";
import { api } from "~/trpc/react";

const supabase = createClient();

/**
 * RealtimeSync Component
 * 
 * Listens for any database changes (Postgres Changes via Supabase Realtime) 
 * and triggers tRPC cache invalidations. This ensures the user dashboard
 * updates instantly when an admin pushes data or a task status changes.
 */
export function RealtimeSync() {
  const utils = api.useUtils();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Subscribe to all changes in the public schema
    const channel = supabase
      .channel("db-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public" },
        (payload) => {
          // Clear previous debounce
          if (debounceRef.current) clearTimeout(debounceRef.current);

          // Debounce invalidation to prevent "thundering herd" re-renders
          debounceRef.current = setTimeout(() => {
            const table = (payload.table as string).toLowerCase();
            
            // Invalidate specific routers based on table updates
            if (table.includes("task")) {
              void utils.task.getUserTasks.invalidate();
            }
            
            if (table.includes("milestone")) {
              void utils.ecosystem.getMilestones.invalidate();
            }

            if (table.includes("insight") || table.includes("deliverable") || table.includes("recommendation")) {
              void utils.ecosystem.invalidate();
            }

            // Global fallback
            void utils.invalidate();
          }, 100); // 100ms debounce
        }
      )
      .subscribe();

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      void supabase.removeChannel(channel);
    };
  }, [utils]);

  return null;
}
