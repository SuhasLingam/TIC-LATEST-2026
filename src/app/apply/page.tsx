import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { ApplicationWizard } from "~/components/application/ApplicationWizard";
import { Suspense } from "react";

export default function ApplyPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
          <Suspense fallback={<div className="h-96 w-full animate-pulse bg-foreground/5 rounded-xl max-w-2xl"></div>}>
            <ApplicationWizard />
          </Suspense>
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
