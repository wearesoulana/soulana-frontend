import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Features",
  description: "Learn about Soulana's robust security measures and how we protect your donations using blockchain technology.",
  keywords: ["blockchain security", "donation security", "crypto security", "secure giving", "transaction safety"],
  openGraph: {
    title: "Security Features | Soulana",
    description: "Learn about Soulana's robust security measures and how we protect your donations using blockchain technology.",
    images: [
      {
        url: "/images/og/security.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Security Features",
      },
    ],
  },
  twitter: {
    title: "Security Features | Soulana",
    description: "Learn about Soulana's robust security measures and how we protect your donations using blockchain technology.",
    images: ["/images/og/security.jpg"],
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 