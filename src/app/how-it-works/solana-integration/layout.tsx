import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solana Integration",
  description: "Discover how Soulana utilizes Solana blockchain technology to enable fast, secure, and transparent charitable donations.",
  keywords: ["solana blockchain", "crypto donation", "blockchain integration", "smart contracts", "web3 charity"],
  openGraph: {
    title: "Solana Integration | Soulana",
    description: "Discover how Soulana utilizes Solana blockchain technology to enable fast, secure, and transparent charitable donations.",
    images: [
      {
        url: "/images/og/solana-integration.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Solana Integration",
      },
    ],
  },
  twitter: {
    title: "Solana Integration | Soulana",
    description: "Discover how Soulana utilizes Solana blockchain technology to enable fast, secure, and transparent charitable donations.",
    images: ["/images/og/solana-integration.jpg"],
  },
};

export default function SolanaIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 