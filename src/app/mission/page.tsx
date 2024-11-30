import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/mission/hero-section";
import { ValuesSection } from "@/components/sections/mission/values-section";
import { VisionSection } from "@/components/sections/mission/vision-section";

export const metadata: Metadata = {
  title: "Our Mission | Soulana",
  description: "Learn about our mission to revolutionize charitable giving through blockchain technology and create lasting global impact.",
  keywords: ["mission", "vision", "values", "blockchain charity", "social impact"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      
      {/* Add padding to account for fixed navbar */}
      <div className="pt-20">
        <main className="container mx-auto px-4 py-20">
          <HeroSection />
          <ValuesSection />
          <VisionSection />
        </main>
      </div>

      <Footer />
    </div>
  );
} 