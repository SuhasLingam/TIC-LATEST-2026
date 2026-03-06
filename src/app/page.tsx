import { HydrateClient } from "~/trpc/server";
import { Hero } from "~/components/Hero";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col">
        <Hero />
      </main>
    </HydrateClient>
  );
}
