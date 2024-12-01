import { Quote } from "lucide-react";

const manifestoPoints = [
  {
    title: "Transparency Above All",
    content: "We believe in complete transparency in charitable giving. Every transaction, every donation, and every impact should be visible and verifiable."
  },
  {
    title: "Technology for Good",
    content: "We harness the power of blockchain not for profit, but for social good. Technology should serve humanity, not the other way around."
  },
  {
    title: "Community First",
    content: "Our platform is built by the community, for the community. We empower donors and causes to connect directly and create meaningful change."
  },
  {
    title: "Global Impact, Local Touch",
    content: "While we think globally, we act locally. Every community has unique needs, and our platform adapts to serve them all."
  },
  {
    title: "Sustainable Change",
    content: "We're not here for quick fixes. Our goal is to create lasting, sustainable change through innovative blockchain solutions."
  }
];

export const ManifestoSection = () => {
  return (
    <section className="mt-32">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 mb-6">
          Our Manifesto
        </h2>
        <p className="text-xl text-red-800/80 dark:text-rose-100/80 max-w-3xl mx-auto">
          These are the principles that guide us in our mission to revolutionize charitable giving through blockchain technology.
        </p>
      </div>

      {/* Manifesto Content */}
      <div className="relative">
        {/* Background Decoration */}
        <div className="absolute -top-8 -right-8 w-64 h-64 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl opacity-50" />

        {/* Content Container */}
        <div className="relative bg-white/50 dark:bg-red-950/50 rounded-2xl p-8 md:p-12 shadow-lg border border-red-100 dark:border-red-900">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center shadow-lg">
            <Quote className="w-6 h-6 text-white" />
          </div>

          {/* Manifesto Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {manifestoPoints.map((point) => (
              <div 
                key={point.title}
                className="relative group"
              >
                {/* Point Content */}
                <div className="bg-white dark:bg-red-950/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-red-100 dark:border-red-900">
                  <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-red-800/80 dark:text-rose-100/80">
                    {point.content}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/5 dark:group-hover:from-red-400/5 dark:group-hover:to-red-400/5 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 