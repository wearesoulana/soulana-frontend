import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  StatsSection,
  VideoSection,
  ImpactStories,
  Testimonials,
  PartnerSection,
  CTASection
} from "@/components/sections/landing";

export const metadata: Metadata = {
  title: "CharityChain - Blockchain-Powered Charitable Giving",
  description: "Transform charitable giving with blockchain technology. Make secure, transparent donations and track your impact in real-time.",
  keywords: ["charity", "blockchain", "donation", "solana", "transparency", "giving"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <HeroSection />
        <StatsSection />
        <VideoSection />
        <PartnerSection />
        <Testimonials />
        <ImpactStories />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
