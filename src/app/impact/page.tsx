"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  ImpactMetricsSection,
  SuccessStoriesSection,
  GlobalReachSection
} from "@/components/sections/impact";

// Smooth animation variants
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier easing
    }
  }
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <Navbar />
      
      <motion.main 
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div 
          variants={sectionVariants}
        >
          <HeroSection />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ImpactMetricsSection />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SuccessStoriesSection />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <GlobalReachSection />
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
} 