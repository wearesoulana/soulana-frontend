import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | CharityChain",
    default: "Our Mission | CharityChain",
  },
  description: "Learn about our mission to revolutionize charitable giving through blockchain technology and create lasting global impact.",
  keywords: ["mission", "vision", "values", "blockchain charity", "social impact"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charitychain.com/mission",
    siteName: "CharityChain",
    title: "Our Mission | CharityChain",
    description: "Learn about our mission to revolutionize charitable giving through blockchain technology.",
    images: [
      {
        url: "/images/og/mission.jpg",
        width: 1200,
        height: 630,
        alt: "CharityChain - Our Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission | CharityChain",
    description: "Learn about our mission to revolutionize charitable giving through blockchain technology.",
    images: ["/images/og/mission.jpg"],
    creator: "@charitychain",
  },
};

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 