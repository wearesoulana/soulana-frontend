import type { Metadata } from "next";
import { DonationProjects } from "@/components/sections/donate/donation-projects";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Donate | CharityChain",
  description: "Make a difference by donating to our Solana-powered charitable projects.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <DonationProjects />
      </main>
      <Footer />
    </div>
  );
}