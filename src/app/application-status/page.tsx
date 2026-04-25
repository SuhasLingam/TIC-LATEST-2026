import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { Suspense } from "react";
import { StatusView } from "./StatusView";

export default function ApplicationStatusPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
          <Suspense fallback={<div className="h-64 w-full animate-pulse bg-foreground/5 rounded-xl max-w-lg"></div>}>
            <StatusView />
          </Suspense>
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
