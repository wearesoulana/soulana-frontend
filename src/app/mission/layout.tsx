import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Our Mission | Soulana",
  },
  description: "Learn about our mission to revolutionize charitable giving through blockchain technology and create lasting global impact.",
  keywords: ["mission", "vision", "values", "blockchain charity", "social impact"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Soulana.com/mission",
    siteName: "Soulana",
    title: "Our Mission | Soulana",
    description: "Learn about our mission to revolutionize charitable giving through blockchain technology.",
    images: [
      {
        url: "/images/og/mission.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Our Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission | Soulana",
    description: "Learn about our mission to revolutionize charitable giving through blockchain technology.",
    images: ["/images/og/mission.jpg"],
    creator: "@Soulana",
  },
};

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 