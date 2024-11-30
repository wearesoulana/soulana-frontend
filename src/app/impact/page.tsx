import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  ImpactMetricsSection,
  SuccessStoriesSection,
  GlobalReachSection
} from "@/components/sections/impact";

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <HeroSection />
        <ImpactMetricsSection />
        <SuccessStoriesSection />
        <GlobalReachSection />
      </main>

      <Footer />
    </div>
  );
} 