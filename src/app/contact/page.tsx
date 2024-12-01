"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  ContactFormSection,
  OfficeLocationsSection,
  FAQSection,
  CTASection
} from "@/components/sections/contact";
import { Toaster } from "sonner";

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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Toaster position="top-center" richColors />
      <Navbar />
      
      <motion.main 
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          variants={fadeIn}
          className="relative z-30"
        >
          <HeroSection />
        </motion.div>

        <motion.div 
          variants={scaleIn}
          viewport={{ once: true }}
          className="relative z-20"
        >
          <OfficeLocationsSection />
        </motion.div>

        <motion.div 
          variants={fadeIn}
          viewport={{ once: true }}
          className="relative z-10 mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <ContactFormSection />
          <FAQSection />
        </motion.div>

        <motion.div 
          variants={scaleIn}
          viewport={{ once: true }}
          className="relative z-0"
        >
          <CTASection />
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
} 