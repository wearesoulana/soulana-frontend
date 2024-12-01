"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  StatsSection,
  VideoSection,
  ImpactStories,
  Testimonials,
  PartnerSection,
  CTASection
} from "@/components/sections/landing";
import { motion } from "framer-motion";

// Container animation variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

// Child animation variant
const childVariants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <motion.main 
        className="container mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <HeroSection />
        </motion.div>

        <motion.div 
          variants={childVariants}
          viewport={{ once: true }}
        >
          <StatsSection />
        </motion.div>

        <motion.div 
          variants={childVariants}
          viewport={{ once: true }}
        >
          <VideoSection />
        </motion.div>

        <motion.div 
          variants={childVariants}
          viewport={{ once: true }}
        >
          <PartnerSection />
        </motion.div>

        <motion.div 
          variants={childVariants}
          viewport={{ once: true }}
        >
          <Testimonials />
        </motion.div>

        <motion.div 
          variants={childVariants}
          viewport={{ once: true }}
        >
          <ImpactStories />
        </motion.div>

        <motion.div 
          variants={childVariants}
          viewport={{ once: true }}
        >
          <CTASection />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
