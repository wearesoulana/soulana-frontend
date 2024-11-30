import React from "react";
import { CheckCircle, FileCheck, Globe, ShieldCheck } from "lucide-react";

const complianceItems = [
  {
    icon: CheckCircle,
    title: "KYC/KYB Compliance",
    description: "Comprehensive Know Your Customer and Know Your Business procedures.",
    details: [
      "Identity verification",
      "Transaction screening", 
      "Risk assessment"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Audit & Reporting",
    description: "Regular audits and transparent reporting mechanisms.",
    details: [
      "External audits",
      "Compliance reporting",
      "Transparency logs"
    ]
  },
  {
    icon: FileCheck,
    title: "Regulatory Standards",
    description: "Adherence to international financial regulations and standards.",
    details: [
      "GDPR compliance",
      "Financial regulations",
      "Data protection"
    ]
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Meeting regulatory requirements across multiple jurisdictions.",
    details: [
      "Cross-border compliance",
      "Regional regulations",
      "International standards"
    ]
  }
];

export const ComplianceSection = () => {
  return (
    <section className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50">
          Compliance & Standards
        </h2>
        <p className="mt-4 text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl mx-auto">
          Meeting and exceeding global regulatory requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {complianceItems.map((item) => (
          <div 
            key={item.title}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-8 transition-all duration-300 hover:scale-105"
          >
            <item.icon className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-950 dark:text-rose-50 mb-2">
              {item.title}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80 mb-4">
              {item.description}
            </p>
            <ul className="space-y-2">
              {item.details.map((detail) => (
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