import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { Suspense } from "react";
import { ActivationFlow } from "~/components/activation/ActivationFlow";

export default function ActivateMembershipPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
          <Suspense fallback={<div className="h-[500px] w-full animate-pulse bg-foreground/5 rounded-2xl max-w-2xl"></div>}>
            <ActivationFlow />
          </Suspense>
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
