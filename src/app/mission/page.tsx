"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/mission/hero-section";
import { ValuesSection } from "@/components/sections/mission/values-section";
import { VisionSection } from "@/components/sections/mission/vision-section";
import { MotivationSection } from "@/components/sections/mission/motivation-section";
import { ManifestoSection } from "@/components/sections/mission/manifesto-section";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Custom easing for smooth animation
    }
  }
};

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      
      <div className="pt-20">
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
            viewport={{ once: true }}
          >
            <ValuesSection />
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            viewport={{ once: true }}
          >
            <MotivationSection />
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            viewport={{ once: true }}
          >
            <VisionSection />
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            viewport={{ once: true }}
          >
            <ManifestoSection />
          </motion.div>
        </motion.main>
      </div>

      <Footer />
    </div>
  );
} 