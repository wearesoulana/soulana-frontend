import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Our Team",
  },
  description: "Meet the passionate team behind Soulana. Learn about our experts and advisors driving blockchain innovation in charitable giving.",
  keywords: ["team", "experts", "advisors", "blockchain", "charity", "careers"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberia-frontend.vercel.app/team",
    siteName: "Soulana",
    title: "Our Team | Soulana",
    description: "Meet the passionate team behind Soulana.",
    images: [
      {
        url: "/images/og/team.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Our Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Soulana",
    description: "Meet the passionate team behind Soulana.",
    images: ["/images/og/team.jpg"],
    creator: "@Soulana",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}