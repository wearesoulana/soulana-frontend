import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | CharityChain",
    default: "Contact Us | CharityChain",
  },
  description: "Get in touch with our team. We're here to help with any questions about blockchain-powered charitable giving.",
  keywords: ["contact", "support", "help", "charity", "blockchain", "donation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charitychain.com/contact",
    siteName: "CharityChain",
    title: "Contact Us | CharityChain",
    description: "Get in touch with our team. We're here to help with any questions.",
    images: [
      {
        url: "/images/og/contact.jpg",
        width: 1200,
        height: 630,
        alt: "CharityChain - Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | CharityChain",
    description: "Get in touch with our team. We're here to help with any questions.",
    images: ["/images/og/contact.jpg"],
    creator: "@charitychain",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 