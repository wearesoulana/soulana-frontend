import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Legal Information",
  },
  description: "Legal information, terms of service, privacy policy, and accessibility statement for Soulana platform.",
  keywords: ["legal", "terms", "privacy", "accessibility", "cookies", "policy"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberia-frontend.vercel.app/legal",
    siteName: "Soulana",
    title: "Legal Information | Soulana",
    description: "Legal information and policies for the Soulana platform.",
    images: [
      {
        url: "/images/og/legal.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Legal Information",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Information | Soulana",
    description: "Legal information and policies for the Soulana platform.",
    images: ["/images/og/legal.jpg"],
    creator: "@Soulana",
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 