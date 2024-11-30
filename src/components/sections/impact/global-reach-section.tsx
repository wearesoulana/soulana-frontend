import React from "react";
import { Globe2 } from "lucide-react";

const impactPoints = [
  {
    id: 1,
    name: "New York",
    country: "USA",
    coordinates: { x: "28%", y: "32%" },
    amount: "$2.5M",
    projects: 125,
  },
  {
    id: 2,
    name: "London",
    country: "UK",
    coordinates: { x: "48%", y: "25%" },
    amount: "$1.8M",
    projects: 98,
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    coordinates: { x: "62%", y: "42%" },
    amount: "$1.4M",
    projects: 82,
  },
  {
    id: 4,
    name: "Singapore",
    country: "Singapore",
    coordinates: { x: "78%", y: "48%" },
    amount: "$1.2M",
    projects: 76,
  },
  {
    id: 5,
    name: "Cape Town",
    country: "South Africa",
    coordinates: { x: "55%", y: "68%" },
    amount: "$950K",
    projects: 64,
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    coordinates: { x: "88%", y: "65%" },
    amount: "$1.5M",
    projects: 89,
  },
  {
    id: 7,
    name: "São Paulo",
    country: "Brazil",
    coordinates: { x: "35%", y: "62%" },
    amount: "$750K",
    projects: 52,
  },
  {
    id: 8,
    name: "Tokyo",
    country: "Japan",
    coordinates: { x: "85%", y: "32%" },
    amount: "$2.1M",
    projects: 108,
  }
];

export const GlobalReachSection = () => {
  return (
    <section className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50">
          Global Impact Reach
        </h2>
        <p className="mt-4 text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl mx-auto">
          Making a difference across continents through blockchain-powered giving
        </p>
      </div>

      {/* World Map Container */}
      <div className="relative w-full aspect-[2/1] bg-white/30 dark:bg-black/30 rounded-3xl border border-red-200 dark:border-red-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/impact/world-map-pattern.svg')] bg-no-repeat bg-center bg-contain opacity-20" />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 dark:from-black/20 dark:to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-black/50" />

        {/* Impact Points */}
        {impactPoints.map((point) => (
          <div
            key={point.id}
            className="absolute group"
            style={{ left: point.coordinates.x, top: point.coordinates.y }}
          >
            {/* Ripple Effect */}
            <div className="absolute -inset-4">
              <div className="absolute inset-0 rounded-full bg-red-500/20 dark:bg-red-500/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-red-500/40 dark:bg-red-500/50 animate-pulse" />
            </div>

            {/* Point */}
            <div className="relative w-3 h-3 rounded-full bg-red-500 dark:bg-red-400 shadow-lg shadow-red-500/50 dark:shadow-red-500/30">
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-white dark:bg-black rounded-xl shadow-xl p-4 text-center">
                  <div className="font-bold text-red-950 dark:text-rose-50">
                    {point.name}, {point.country}
                  </div>
                  <div className="text-sm text-red-800/80 dark:text-rose-100/80">
                    {point.amount} • {point.projects} Projects
                  </div>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 bg-white dark:bg-black" />
              </div>
            </div>
          </div>
        ))}

        {/* Stats Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-white via-white/95 to-white/0 dark:from-black dark:via-black/95 dark:to-black/0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-950 dark:text-rose-50">$12.2M+</div>
              <div className="text-sm text-red-800/80 dark:text-rose-100/80">Total Donations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-950 dark:text-rose-50">694</div>
              <div className="text-sm text-red-800/80 dark:text-rose-100/80">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-950 dark:text-rose-50">48</div>
              <div className="text-sm text-red-800/80 dark:text-rose-100/80">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-950 dark:text-rose-50">15K+</div>
              <div className="text-sm text-red-800/80 dark:text-rose-100/80">Donors Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-center gap-8 text-sm text-red-800/80 dark:text-rose-100/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 dark:bg-red-400" />
          Active Projects
        </div>
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-red-500 dark:text-red-400" />
          Global Coverage
        </div>
      </div>
    </section>
  );
}; 