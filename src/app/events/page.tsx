import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { EventsHero } from "~/components/events/EventsHero";
import { EventHighlights } from "~/components/events/EventHighlights";
import { EventComparison } from "~/components/events/EventComparison";

export default function EventsPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex flex-col min-h-screen">
          <EventsHero />
          <EventHighlights />
          <EventComparison />
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
