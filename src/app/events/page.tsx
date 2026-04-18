import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { EventsHero } from "~/components/events/EventsHero";
import { EventHighlights } from "~/components/events/EventHighlights";
import { EventComparison } from "~/components/events/EventComparison";

export default function EventsPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex min-h-screen flex-col">
          <EventsHero />
          <EventHighlights />
          <EventComparison />
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
