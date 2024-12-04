"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  Home, 
  Users, 
  Heart,
  PiggyBank,
  Coins,
  Zap, 
  MessageCircle,
  Rocket,
  Menu,
  ChevronRight
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    icon: PiggyBank,
    description: "Support our charitable projects"
  },
  { 
    name: "Mission",
    href: "/mission",
    icon: Rocket,
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
    name: "Profile",
    href: "/profile",
    icon: Users,
    description: "View your donations and tokens"
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

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-50"
    >
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" 
            : "bg-transparent"
        }`}
      />
      <div className="container mx-auto px-4 relative">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.svg" 
                  alt="Logo" 
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:scale-110 invert dark:invert-0 w-auto h-auto"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-gray-800 dark:text-rose-50">
                Soulana
              </span>
            </button>

            {/* Desktop Navigation Items */}
            <div className="flex items-center gap-2">
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
                            ? "text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-950/50"
                            : "text-gray-600 dark:text-rose-50/70 hover:bg-gray-100/80 dark:hover:bg-red-950/50"
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
                          className="absolute top-full left-0 mt-1 w-56 rounded-md bg-white/95 dark:bg-gray-950 shadow-lg ring-1 ring-black/5 dark:ring-white/5 py-1"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          {item.children.map((child) => (
                            <button
                              type="button"
                              key={child.name}
                              onClick={() => handleNavigation(child.href)}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                pathname === child.href
                                  ? "bg-red-50/80 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                                  : "text-gray-600 dark:text-rose-50/70 hover:bg-gray-100/80 dark:hover:bg-red-950/50"
                              }`}
                              role="menuitem"
                              aria-label={child.name}
                            >
                              <div>
                                {child.name}
                                <span className="block text-xs text-gray-500 dark:text-rose-100/60">
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
                          ? "text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-950/50"
                          : "text-gray-600 dark:text-rose-50/70 hover:bg-gray-100/80 dark:hover:bg-red-950/50"
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
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  type="button"
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-red-950 dark:text-rose-50" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white dark:bg-gray-900/95 p-0">
                <SheetHeader className="p-6 border-b border-red-100 dark:border-red-800/30">
                  <SheetTitle className="text-2xl font-bold text-red-950 dark:text-rose-50">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6 px-4 space-y-2">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {item.children ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 rounded-md text-red-950 dark:text-rose-50">
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </div>
                          <div className="pl-4 space-y-1">
                            {item.children.map((child) => (
                              <button
                                type="button"
                                key={child.name}
                                onClick={() => handleNavigation(child.href)}
                                className="w-full p-3 text-left rounded-md text-red-800/80 dark:text-rose-100/80 hover:bg-red-50 dark:hover:bg-red-900/30"
                                aria-label={child.name}
                              >
                                {child.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          aria-label={item.name}
                          onClick={() => handleNavigation(item.href)}
                          className={`w-full p-3 rounded-md flex items-center gap-3 ${
                            pathname === item.href
                              ? "bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                              : "text-red-800/80 dark:text-rose-100/80 hover:bg-red-50 dark:hover:bg-red-900/30"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Logo (center) */}
          <div className="lg:hidden flex-1 flex justify-center">
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.svg" 
                  alt="Logo" 
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:scale-110 invert dark:invert-0 w-auto h-auto"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-red-950 dark:text-rose-50">
                Soulana
              </span>
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}