"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
	HeroSection,
	StepsSection,
	FeaturesSection,
	CTASection,
} from "@/components/sections/how-it-works/donation-process";

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

export default function DonationProcessPage() {
	const mainRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start start", "end end"]
	});

	// Parallax effect for sections
	const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
	const stepsY = useTransform(scrollYProgress, [0.1, 0.4], [50, 0]);
	const featuresY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
	const ctaY = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);

	// Opacity transforms for fade effects
	const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
	const stepsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
	const featuresOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
	const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
			<Navbar />

			<motion.main 
				ref={mainRef}
				className="container mx-auto px-4 py-20"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<motion.div 
					variants={sectionVariants}
					style={{ y: heroY, opacity: heroOpacity }}
					className="relative z-30"
				>
					<HeroSection />
				</motion.div>

				<motion.div 
					variants={sectionVariants}
					viewport={{ once: true, margin: "-100px" }}
					style={{ y: stepsY, opacity: stepsOpacity }}
					className="relative z-20"
				>
					<StepsSection />
				</motion.div>

				<motion.div 
					variants={sectionVariants}
					viewport={{ once: true, margin: "-100px" }}
					style={{ y: featuresY, opacity: featuresOpacity }}
					className="relative z-10"
				>
					<FeaturesSection />
				</motion.div>

				<motion.div 
					variants={sectionVariants}
					viewport={{ once: true, margin: "-100px" }}
					style={{ y: ctaY, opacity: ctaOpacity }}
					className="relative z-0"
				>
					<CTASection />
				</motion.div>

				{/* Scroll Progress Indicator */}
				<motion.div 
					className="fixed top-0 left-0 right-0 h-1 bg-red-500 dark:bg-red-600 origin-left z-50"
					style={{ scaleX: scrollYProgress }}
				/>
			</motion.main>

			<Footer />
		</div>
	);
}
