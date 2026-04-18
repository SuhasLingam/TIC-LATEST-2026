import { HydrateClient } from "~/trpc/server";
import { PageEntrance } from "~/components/PageEntrance";
import { MembershipHero } from "~/components/membership/MembershipHero";
import { HowToJoin } from "~/components/membership/HowToJoin";
import { MembershipGoal } from "~/components/membership/MembershipGoal";
import { Offerings } from "~/components/Offerings";

export default function MembershipPage() {
  return (
    <HydrateClient>
      <PageEntrance>
        <div className="flex min-h-screen flex-col">
          <MembershipHero />

          {/* We reuse the extremely premium Offerings component that was already built */}
          <div className="bg-background relative z-10 w-full">
            <Offerings />
          </div>

          <HowToJoin />
          <MembershipGoal />
        </div>
      </PageEntrance>
    </HydrateClient>
  );
}
