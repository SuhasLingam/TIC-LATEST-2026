import { HydrateClient } from "~/trpc/server";
import { Hero } from "~/components/Hero";
import { WhatIsTIC } from "~/components/WhatIsTIC";
import { HowItWorks } from "~/components/HowItWorks";
import { WhoItsFor } from "~/components/WhoItsFor";
// import { Offerings } from "~/components/Offerings";
import { FAQ } from "~/components/FAQ";
import { CTA } from "~/components/CTA";
import { PageEntrance } from "~/components/PageEntrance";

export default async function Home() {
  return (
    <HydrateClient>
      <PageEntrance>
        <Hero />
        <WhatIsTIC />
        <HowItWorks />
        <WhoItsFor />
        {/* <Offerings /> */}
        <FAQ />
        <CTA />
      </PageEntrance>
    </HydrateClient>
  );
}
