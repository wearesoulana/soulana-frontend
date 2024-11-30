import React from "react";

const features = [
  {
    title: "Blink Technology",
    description: "Solana's revolutionary Blink technology enables near-instant transaction finality.",
    details: [
      "Sub-second confirmation times",
      "Parallel transaction processing",
      "Scalable architecture"
    ]
  },
  {
    title: "Smart Contracts",
    description: "Automated and transparent fund distribution through secure smart contracts.",
    details: [
      "Automated disbursement",
      "Transparent tracking",
      "Programmable logic"
    ]
  },
  {
    title: "Cross-Chain Bridge",
    description: "Seamlessly accept donations from multiple blockchain networks.",
    details: [
      "Multi-chain support",
      "Unified experience",
      "Broad accessibility"
    ]
  }
];

export const TechnologySection = () => {
  return (
    <section className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50">
          Advanced Technology Stack
        </h2>
        <p className="mt-4 text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl mx-auto">
          Built on cutting-edge blockchain technology for maximum efficiency and security
        </p>
      </div>

      <div className="space-y-12">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
          >
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-red-950 dark:text-rose-50">
                {feature.title}
              </h3>
              <p className="text-lg text-red-800/80 dark:text-rose-100/80">
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
            <div className="flex-1 w-full aspect-video bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-8">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 