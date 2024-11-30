import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  SecurityFeaturesSection,
  ComplianceSection,
  CTASection
} from "@/components/sections/how-it-works/security";

export const metadata: Metadata = {
  title: "Security & Compliance | CharityChain",
  description: "Learn about our enterprise-grade security measures and compliance standards for blockchain-powered charitable giving.",
  keywords: ["security", "blockchain", "compliance", "encryption", "protection", "safety"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <HeroSection />
        <SecurityFeaturesSection />
        <ComplianceSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
} 