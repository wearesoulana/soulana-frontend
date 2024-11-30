import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  ContactFormSection,
  OfficeLocationsSection,
  FAQSection,
  CTASection
} from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Us | Soulana",
  description: "Get in touch with our team. We're here to help with any questions about blockchain-powered charitable giving.",
  keywords: ["contact", "support", "help", "charity", "blockchain", "donation"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <HeroSection />
        <OfficeLocationsSection />
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactFormSection />
          <FAQSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 