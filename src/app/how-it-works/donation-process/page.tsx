import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
	HeroSection,
	StepsSection,
	FeaturesSection,
	CTASection,
} from "@/components/sections/how-it-works/donation-process";

export const metadata: Metadata = {
	title: "How Donations Work | Soulana",
	description: "Understand our simple and secure blockchain-powered donation process. Make transparent donations with instant tracking.",
	keywords: ["donation", "blockchain", "process", "charity", "giving", "transparency"],
};

// Force page to be statically rendered
export const dynamic = "force-static";
export const revalidate = false;

export default function DonationProcessPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
			<Navbar />

			<main className="container mx-auto px-4 py-20">
				<HeroSection />
				<StepsSection />
				<FeaturesSection />
				<CTASection />
			</main>

			<Footer />
		</div>
	);
}
