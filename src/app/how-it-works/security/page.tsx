"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  SecurityFeaturesSection,
  ComplianceSection,
  CTASection
} from "@/components/sections/how-it-works/security";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.45, 0.32, 0.9]
    }
  }
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      
      <motion.main 
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={sectionVariants}>
          <HeroSection />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SecurityFeaturesSection />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ComplianceSection />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CTASection />
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
} 