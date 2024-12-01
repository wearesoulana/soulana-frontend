import { Heart, Globe2, Lightbulb, ArrowRight } from "lucide-react";

const motivations = [
  {
    icon: Heart,
    title: "Empowering Global Giving",
    description: "We believe in breaking down barriers to charitable giving, making it accessible to everyone, everywhere.",
    points: [
      "Instant cross-border donations",
      "Minimal transaction fees",
      "Transparent fund tracking"
    ]
  },
  {
    icon: Globe2,
    title: "Bridging the Gap",
    description: "Connecting donors directly with causes, eliminating intermediaries and maximizing impact.",
    points: [
      "Direct donor-cause connection",
      "Real-time impact tracking",
      "Community-driven initiatives"
    ]
  },
  {
    icon: Lightbulb,
    title: "Innovation for Good",
    description: "Leveraging blockchain technology to create a more efficient and transparent charitable giving ecosystem.",
    points: [
      "Smart contract automation",
      "Decentralized verification",
      "Innovative giving solutions"
    ]
  }
];

export const MotivationSection = () => {
  return (
    <section className="mt-32">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 mb-6">
          What Drives Us
        </h2>
        <p className="text-xl text-red-800/80 dark:text-rose-100/80 max-w-3xl mx-auto">
          Our motivation stems from a deep-rooted belief that blockchain technology can revolutionize charitable giving and create lasting positive change.
        </p>
      </div>

      {/* Motivation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {motivations.map((item) => (
          <div 
            key={item.title}
            className="group relative bg-white dark:bg-red-950/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 dark:border-red-900"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <item.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-red-950 dark:text-rose-50 mb-3">
              {item.title}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80 mb-6">
              {item.description}
            </p>

            {/* Points */}
            <ul className="space-y-2">
              {item.points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-red-800/80 dark:text-rose-100/80">
                  <ArrowRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:via-red-600/5 group-hover:to-red-600/5 dark:group-hover:from-red-400/5 dark:group-hover:via-red-400/5 dark:group-hover:to-red-400/5 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}; 