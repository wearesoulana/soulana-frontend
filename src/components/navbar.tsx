"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ChevronDown, 
  Home, 
  Users, 
  Heart,
  Coins,
  Zap, 
  MessageCircle
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WalletButton } from "@/components/ui/wallet-button";

const navigation = [
  { 
    name: "Home",
    href: "/",
    icon: Home,
    description: "Welcome to the future of giving"
  },
  { 
    name: "Donate",
    href: "/donate",
    icon: Heart,
    description: "Support our charitable projects"
  },
  { 
    name: "Our Mission",
    href: "/mission",
    icon: Heart,
    description: "Transforming global philanthropy"
  },
  { 
    name: "Impact",
    href: "/impact",
    icon: Heart,
    description: "See our global impact"
  },
  { 
    name: "Team",
    href: "/team",
    icon: Users,
    description: "Meet our dedicated team"
  },
  { 
    name: "Token",
    href: "/token-rewards",
    icon: Coins,
    description: "Earn tokens by donating"
  },
  {
    name: "Technology",
    href: "#",
    icon: Zap,
    description: "Revolutionary blockchain solutions",
    children: [
      { 
        name: "Donation Process",
        href: "/how-it-works/donation-process",
        description: "Seamless, instant transactions"
      },
      { 
        name: "Solana Integration",
        href: "/how-it-works/solana-integration",
        description: "Next-gen blockchain efficiency"
      },
      { 
        name: "Security",
        href: "/how-it-works/security",
        description: "Enterprise-grade protection"
      },
    ],
  },
  { 
    name: "Contact",
    href: "/contact",
    icon: MessageCircle,
    description: "Get in touch with us"
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  const handleNavigation = (href: string) => {
    if (href !== "#") {
      router.push(href);
      setOpenDropdown(null);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.svg" 
                  alt="Logo" 
                  fill
                  className="transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              <span className="text-2xl font-bold text-red-950 dark:text-rose-50">
                CharityChain
              </span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm rounded-md transition-colors relative group flex items-center gap-2 ${
                        openDropdown === item.name
                          ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50"
                          : "text-red-950/70 dark:text-rose-50/70 hover:bg-red-50 dark:hover:bg-red-950/50"
                      }`}
                      aria-expanded={openDropdown === item.name}
                      aria-haspopup="true"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <div>
                        <div className="flex items-center gap-1">
                          {item.name}
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                    {openDropdown === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-56 rounded-md bg-white dark:bg-gray-950 shadow-lg ring-1 ring-black/5 dark:ring-white/5 py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {item.children.map((child) => (
                          <button
                            key={child.name}
                            type="button"
                            onClick={() => handleNavigation(child.href)}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              pathname === child.href
                                ? "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                                : "text-red-950/70 dark:text-rose-50/70 hover:bg-red-50 dark:hover:bg-red-950/50"
                            }`}
                            role="menuitem"
                          >
                            <div>
                              {child.name}
                              <span className="block text-xs text-red-800/60 dark:text-rose-100/60">
                                {child.description}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigation(item.href)}
                    className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
                      pathname === item.href
                        ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50"
                        : "text-red-950/70 dark:text-rose-50/70 hover:bg-red-50 dark:hover:bg-red-950/50"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <div>
                      {item.name}
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}