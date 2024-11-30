import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | CharityChain",
    default: "Our Impact | CharityChain",
  },
  description: "See the real-world impact of blockchain-powered charitable giving. Explore success stories and global reach metrics.",
  keywords: ["impact", "charity", "blockchain", "donation", "success stories", "metrics"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charitychain.com/impact",
    siteName: "CharityChain",
    title: "Our Impact | CharityChain",
    description: "See the real-world impact of blockchain-powered charitable giving.",
    images: [
      {
        url: "/images/og/impact.jpg",
        width: 1200,
        height: 630,
        alt: "CharityChain - Our Impact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Impact | CharityChain",
    description: "See the real-world impact of blockchain-powered charitable giving.",
    images: ["/images/og/impact.jpg"],
    creator: "@charitychain",
  },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 