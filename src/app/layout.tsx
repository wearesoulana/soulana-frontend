import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";
import { WalletProvider } from "@/contexts/wallet-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://Soulana.com"),
  title: {
    template: "%s | Soulana",
    default: "Soulana - Blockchain-Powered Charitable Giving",
  },
  description: "Transform charitable giving with blockchain technology. Make secure, transparent donations and track your impact in real-time.",
  keywords: ["charity", "blockchain", "donation", "solana", "transparency", "giving"],
  authors: [{ name: "Soulana Team" }],
  creator: "Soulana",
  publisher: "Soulana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Soulana.com",
    siteName: "Soulana",
    title: "Soulana - Blockchain-Powered Charitable Giving",
    description: "Transform charitable giving with blockchain technology. Make secure, transparent donations and track your impact in real-time.",
    images: [
      {
        url: "/images/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Soulana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soulana - Blockchain-Powered Charitable Giving",
    description: "Transform charitable giving with blockchain technology. Make secure, transparent donations and track your impact in real-time.",
    images: ["/images/og/default.jpg"],
    creator: "@Soulana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WalletProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
