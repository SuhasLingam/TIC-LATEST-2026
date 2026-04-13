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
        <div className="flex flex-col min-h-screen">
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
