import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation Process",
  description: "Understand how the donation process works on Soulana - from selecting a cause to tracking your impact.",
  keywords: ["donation process", "charitable giving", "blockchain donation", "transparency", "impact tracking"],
  openGraph: {
    title: "Donation Process | Soulana",
    description: "Understand how the donation process works on Soulana - from selecting a cause to tracking your impact.",
    images: [
      {
        url: "/images/og/donation-process.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Donation Process",
      },
    ],
  },
  twitter: {
    title: "Donation Process | Soulana",
    description: "Understand how the donation process works on Soulana - from selecting a cause to tracking your impact.",
    images: ["/images/og/donation-process.jpg"],
  },
};

export default function DonationProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 