import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  BenefitsSection,
  TechnologySection,
  CTASection
} from "@/components/sections/how-it-works/solana-integration";

export const metadata: Metadata = {
  title: "Solana Integration | CharityChain",
  description: "Discover how we leverage Solana blockchain for fast, secure, and cost-effective charitable donations.",
  keywords: ["solana", "blockchain", "integration", "crypto donation", "technology"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function SolanaIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <HeroSection />
        <BenefitsSection />
        <TechnologySection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
} 