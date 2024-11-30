import React from "react";
import { Zap, DollarSign, Shield, Clock } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process donations in under a second with Solana's high-performance blockchain."
  },
  {
    icon: DollarSign,
    title: "Minimal Fees",
    description: "Enjoy near-zero transaction costs, ensuring maximum impact for every donation."
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Benefit from enterprise-grade security and transparent transaction tracking."
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Experience instant confirmation and immediate fund disbursement."
  }
];

export const BenefitsSection = () => {
  return (
    <section className="mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-12">
        Why We Chose Solana
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit) => (
          <div 
            key={benefit.title}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-8 transition-all duration-300 hover:scale-105"
          >
            <benefit.icon className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-950 dark:text-rose-50 mb-2">
              {benefit.title}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}; 