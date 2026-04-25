"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";

export function EcosystemSeeder({ profileId, tier }: { profileId: string, tier: string }) {
  const seedMutation = api.ecosystem.seedInitialData.useMutation();

  useEffect(() => {
    if (profileId) {
      seedMutation.mutate({ profileId, tier });
    }
  }, [profileId, tier]);

  return null;
}
