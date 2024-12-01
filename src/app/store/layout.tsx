import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Store",
  },
  description: "Shop exclusive Soulana merchandise and redeem your tokens for unique rewards and collectibles.",
  keywords: ["store", "merchandise", "rewards", "tokens", "collectibles", "nft"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberia-frontend.vercel.app/store",
    siteName: "Soulana",
    title: "Store | Soulana",
    description: "Shop exclusive Soulana merchandise and redeem your tokens.",
    images: [
      {
        url: "/images/og/store.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Store | Soulana",
    description: "Shop exclusive Soulana merchandise and redeem your tokens.",
    images: ["/images/og/store.jpg"],
    creator: "@Soulana",
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 