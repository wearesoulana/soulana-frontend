import React from "react";
import { Shield, Lock, Eye, Key } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Multi-Layer Protection",
    description: "Advanced encryption and security protocols protect every transaction.",
    details: [
      "End-to-end encryption",
      "Multi-signature wallets",
      "Real-time monitoring"
    ]
  },
  {
    icon: Lock,
    title: "Secure Smart Contracts",
    description: "Audited and verified smart contracts ensure safe fund distribution.",
    details: [
      "Regular security audits",
      "Automated testing",
      "Bug bounty program"
    ]
  },
  {
    icon: Eye,
    title: "Transaction Monitoring",
    description: "24/7 monitoring system to detect and prevent suspicious activities.",
    details: [
      "Real-time alerts",
      "Fraud detection",
      "Activity logging"
    ]
  },
  {
    icon: Key,
    title: "Access Control",
    description: "Granular permissions and role-based access control.",
    details: [
      "Role-based access",
      "Two-factor authentication",
      "Session management"
    ]
  }
];

export const SecurityFeaturesSection = () => {
  return (
    <section className="mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-12">
        Security Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-8 transition-all duration-300 hover:scale-105"
          >
            <feature.icon className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-950 dark:text-rose-50 mb-2">
              {feature.title}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80 mb-4">
              {feature.description}
            </p>
            <ul className="space-y-2">
              {feature.details.map((detail) => (
                <li key={detail} className="flex items-center gap-2 text-red-800/80 dark:text-rose-100/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}; 