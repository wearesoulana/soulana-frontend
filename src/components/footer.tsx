import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

type FooterLink = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterLinks = {
  [key: string]: FooterSection;
};

const footerLinks: FooterLinks = {
  product: {
    title: "Product",
    links: [
      { name: "Home", href: "/" },
      { name: "Donation Process", href: "/how-it-works/donation-process" },
      { name: "Solana Integration", href: "/how-it-works/solana-integration" },
      { name: "Security", href: "/security" },
      { name: "Impact", href: "/impact" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Mission", href: "/mission" },
      { name: "FAQ", href: "/contact" },
      { name: "Offices", href: "/contact" },
      { name: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/legal/privacy-policy" },
      { name: "Terms of Service", href: "/legal/terms-of-service" },
      { name: "Cookie Settings", href: "/legal/cookie-settings" },
      { name: "Accessibility", href: "/legal/accessibility" },
    ],
  },
  social: {
    title: "Social",
    links: [
      { name: "Twitter", href: "https://twitter.com", icon: Twitter },
      { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
      { name: "Facebook", href: "https://facebook.com", icon: Facebook },
      { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-white/50 dark:bg-black/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className={key === "social" ? "col-span-2 md:col-span-1" : ""}>
              <h3 className="font-semibold text-red-950 dark:text-rose-50 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.icon ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-red-800/60 dark:text-rose-100/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        {link.icon && <link.icon className="h-5 w-5" />}
                        <span>{link.name}</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-red-800/60 dark:text-rose-100/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-red-800/60 dark:text-rose-100/60">
              © {new Date().getFullYear()} Soulana. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link
                href="/legal/terms-of-service"
                className="text-red-800/60 dark:text-rose-100/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/legal/privacy-policy"
                className="text-red-800/60 dark:text-rose-100/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/cookie-settings"
                className="text-red-800/60 dark:text-rose-100/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/legal/accessibility"
                className="text-red-800/60 dark:text-rose-100/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 