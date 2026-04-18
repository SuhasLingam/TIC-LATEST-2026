import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { AboutHero } from "~/components/about/AboutHero";
import { OurMission } from "~/components/about/OurMission";
import { WhatWeDo } from "~/components/about/WhatWeDo";
import { FounderPipeline } from "~/components/about/FounderPipeline";
import { WhoIsTICFor } from "~/components/about/WhoIsTICFor";

export default function AboutPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex min-h-screen flex-col">
          <AboutHero />
          <OurMission />
          <WhatWeDo />
          <FounderPipeline />
          <WhoIsTICFor />
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
