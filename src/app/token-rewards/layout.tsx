import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Token Rewards",
  },
  description: "Learn about Soulana's token rewards program and how you can earn tokens through charitable giving.",
  keywords: ["tokens", "rewards", "cryptocurrency", "blockchain", "charity", "earning"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberia-frontend.vercel.app/token-rewards",
    siteName: "Soulana",
    title: "Token Rewards | Soulana",
    description: "Learn about Soulana's token rewards program.",
    images: [
      {
        url: "/images/og/token-rewards.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Token Rewards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Rewards | Soulana",
    description: "Learn about Soulana's token rewards program.",
    images: ["/images/og/token-rewards.jpg"],
    creator: "@Soulana",
  },
};

export default function TokenRewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 