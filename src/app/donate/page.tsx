"use client";

import { motion } from "framer-motion";
import { DonationProjects } from "@/components/sections/donate/donation-projects";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { ArrowDown, Coins, ShieldCheck, Wallet } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const donationSteps = [
  {
    id: 'connect-wallet',
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Start by connecting your Solana wallet. We support Phantom, Solflare, and other major wallets."
  },
  {
    id: 'choose-amount',
    icon: Coins,
    title: "Choose Amount",
    description: "Select the project you want to support and enter your desired donation amount in SOL."
  },
  {
    id: 'confirm-transaction',
    icon: ShieldCheck,
    title: "Confirm Transaction",
    description: "Review the transaction details in your wallet and confirm to complete your donation."
  }
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <Toaster position="top-center" richColors />
      <motion.main 
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-red-950 dark:text-rose-50 mb-6 mt-16">
            Make a Difference Today
          </h1>
          <p className="text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl mx-auto">
            Your contribution can change lives. Support our projects and help create a better future through blockchain-powered giving.
          </p>
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          className="mb-24"
          variants={fadeIn}
        >
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-red-950 dark:text-rose-50 mb-4">
              How to Donate
            </h2>
            <p className="text-red-800/80 dark:text-rose-100/80">
              Follow these simple steps to make your donation
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            variants={staggerContainer}
          >
            <div className="hidden md:block absolute top-[4rem] left-[calc(17%+1rem)] right-[calc(17%+1rem)] h-0.5 bg-gradient-to-r from-red-200 via-red-300 to-red-200 dark:from-red-800 dark:via-red-700 dark:to-red-800" />
            {donationSteps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className="relative h-full"
                variants={scaleIn}
                viewport={{ once: true }}
              >
                {index < donationSteps.length - 1 && (
                  <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <ArrowDown className="w-6 h-6 text-red-300 dark:text-red-700" />
                  </div>
                )}
                
                <div className="bg-white dark:bg-red-950/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 dark:border-red-900 h-full">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-red-950 dark:text-rose-50 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-red-800/80 dark:text-rose-100/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Section */}
        <motion.div 
          className="mb-16"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <DonationProjects />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          {[
            { title: "100%", subtitle: "Transparent Transactions" },
            { title: "Instant", subtitle: "Transaction Processing" },
            { title: "Secure", subtitle: "Blockchain Technology" }
          ].map((item) => (
            <motion.div 
              key={item.title}
              className="bg-white/50 dark:bg-red-950/30 rounded-xl p-6 text-center"
              variants={scaleIn}
            >
              <div className="font-bold text-2xl text-red-950 dark:text-rose-50 mb-2">
                {item.title}
              </div>
              <div className="text-red-800/80 dark:text-rose-100/80">
                {item.subtitle}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}