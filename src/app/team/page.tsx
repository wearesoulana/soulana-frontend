import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/team/hero-section";
import { TeamSection } from "@/components/sections/team/team-section";
import { AdvisorsSection } from "@/components/sections/team/advisors-section";

export const metadata: Metadata = {
  title: "Our Team | Soulana",
  description: "Meet the passionate team behind Soulana. Learn about our experts and advisors driving blockchain innovation in charitable giving.",
  keywords: ["team", "experts", "advisors", "blockchain", "charity", "careers", "jobs"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <HeroSection />
        <TeamSection />
        <AdvisorsSection />
      </main>

      <Footer />
    </div>
  );
} 