import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Donate", 
  },
  description: "Make a difference by donating to our Solana-powered charitable projects. Your contribution helps create positive change.",
  keywords: ["donate", "charity", "blockchain", "donation", "giving", "solana", "cryptocurrency"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberia-frontend.vercel.app/donate",
    siteName: "Soulana",
    title: "Donate | Soulana",
    description: "Make a difference by donating to our Solana-powered charitable projects.",
    images: [
      {
        url: "/images/og/donate.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Donate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate | Soulana",
    description: "Make a difference by donating to our Solana-powered charitable projects.",
    images: ["/images/og/donate.jpg"],
    creator: "@Soulana",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}