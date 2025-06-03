import { getLoggedIn } from "@/next-auth";
import { redirect } from "next/navigation";

import { Marketing, BigTestimonial, MentionedBy } from "@/components/landing/marketing";
import { MarketingHero } from "@/components/landing/hero";
import { SimplifiedBonus } from "@/components/landing/bonus";

export default async function RootPage() {
  const isLoggedIn = await getLoggedIn();
  
  // If user is logged in, redirect to their dashboard
  if (isLoggedIn) {
    redirect("/dashboard");
  }

  // Show landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Marketing>
          <MarketingHero
            title="Find the best time to meet"
            description="Coordinate group meetings without the back-and-forth emails"
            callToAction="Create a Meeting Poll"
          />
          <SimplifiedBonus />
          <BigTestimonial />
          <MentionedBy />
        </Marketing>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Rallly: Group Scheduling Tool",
    description: "Create polls and vote to find the best day or time. A free alternative to Doodle.",
  };
}