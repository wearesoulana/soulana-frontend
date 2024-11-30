import { Shield, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "Every transaction is recorded on the Solana blockchain, ensuring complete transparency and security."
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Experience instant donations with Solana Blink, no more waiting for days or paying high fees."
  },
  {
    icon: Heart,
    title: "Maximum Impact",
    description: "Near-zero transaction fees mean more of your donation goes directly to the cause you care about."
  }
];

export const FeaturesSection = () => {
  return (
    <div className="mt-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-8 transition-all duration-300 hover:scale-105"
          >
            <feature.icon className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-950 dark:text-rose-50 mb-2">
              {feature.title}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}; 