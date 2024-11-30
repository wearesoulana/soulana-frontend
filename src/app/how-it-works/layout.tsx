import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | CharityChain",
    default: "How It Works | CharityChain",
  },
  description: "Learn how CharityChain leverages blockchain technology to revolutionize charitable giving with transparency and efficiency.",
  keywords: ["blockchain", "charity", "donation", "solana", "transparency", "security"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charitychain.com/how-it-works",
    siteName: "CharityChain",
    title: "How It Works | CharityChain",
    description: "Learn how CharityChain leverages blockchain technology to revolutionize charitable giving.",
    images: [
      {
        url: "/images/og/how-it-works.jpg",
        width: 1200,
        height: 630,
        alt: "CharityChain - How It Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | CharityChain",
    description: "Learn how CharityChain leverages blockchain technology to revolutionize charitable giving.",
    images: ["/images/og/how-it-works.jpg"],
    creator: "@charitychain",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 