import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Soulana",
    default: "Contact Us",
  },
  description: "Get in touch with our team. We're here to help with any questions about blockchain-powered charitable giving.",
  keywords: ["contact", "support", "help", "charity", "blockchain", "donation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberia-frontend.vercel.app/contact",
    siteName: "Soulana",
    title: "Contact Us | Soulana",
    description: "Get in touch with our team. We're here to help with any questions.",
    images: [
      {
        url: "/images/og/contact.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana - Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Soulana",
    description: "Get in touch with our team. We're here to help with any questions.",
    images: ["/images/og/contact.jpg"],
    creator: "@Soulana",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 