import { ArrowRight, Wallet, Search, Heart, ArrowRight as ArrowRightIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Connect Your Wallet",
    description: "Link your Solana wallet securely to start making instant donations.",
    icon: Wallet,
    details: [
      "Support for multiple Solana wallets",
      "One-click connection process", 
      "Secure wallet integration",
    ]
  },
  {
    id: 2,
    title: "Choose a Charity",
    description: "Browse through our verified list of charitable organizations.",
    icon: Search,
    details: [
      "Filter by cause or location",
      "View detailed charity profiles",
      "Check impact metrics",
    ]
  },
  {
    id: 3,
    title: "Make Your Donation",
    description: "Send your donation instantly using Solana's Blink technology.",
    icon: Heart,
    details: [
      "Instant transactions",
      "Minimal gas fees",
      "Multiple currency support",
    ]
  },
  {
    id: 4,
    title: "Track Your Impact",
    description: "Monitor how your donation is making a difference in real-time.",
    icon: ArrowRightIcon,
    details: [
      "Real-time transaction tracking",
      "Impact visualization",
      "Donation history",
    ]
  },
];

export const StepsSection = () => {
  return (
    <div className="mt-16 space-y-6 lg:space-y-12">
      {steps.map((step) => (
        <div 
          key={step.id}
          className={`flex flex-col ${step.id % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-4 lg:gap-8`}
        >
          <div className={`flex-1 space-y-3 ${step.id % 2 === 0 ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-2.5 ${step.id % 2 === 0 ? 'justify-end' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-base font-medium text-red-600 dark:text-red-400">
                Step {step.id}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-red-950 dark:text-rose-50">
              {step.title}
            </h2>
            <p className="text-lg text-red-800/80 dark:text-rose-100/80">
              {step.description}
            </p>
            <ul className="space-y-2">
              {step.details.map((detail) => (
                <li key={detail} className={`flex items-center gap-2 text-base text-red-800/80 dark:text-rose-100/80 ${step.id % 2 === 0 ? 'justify-end' : ''}`}>
                  {step.id % 2 === 0 && detail}
                  <ArrowRight className={`w-4 h-4 text-red-600 dark:text-red-400 ${step.id % 2 === 0 ? 'rotate-180' : ''}`} />
                  {step.id % 2 !== 0 && detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-[40%] aspect-[16/9] bg-white/30 dark:bg-black/30 rounded-lg border border-red-200 dark:border-red-900 p-4">
            <div className="w-full h-full rounded-md bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/20 flex items-center justify-center">
              <step.icon className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};