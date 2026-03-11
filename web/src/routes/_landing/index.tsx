import {
  FAQSection,
  HeroSection,
  OverviewSection,
} from "@/features/landing/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/")({
  head: () => ({
    meta: [{ title: "Better Prompt | Turn Rough Ideas Into Perfect Prompts" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="flex flex-col space-y-24">
      <HeroSection />
      <OverviewSection />
      <FAQSection />
    </main>
  );
}
