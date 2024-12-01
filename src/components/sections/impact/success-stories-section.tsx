import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    id: 1,
    title: "Clean Water Initiative",
    location: "East Africa",
    impact: "10,000+ people served",
    amount: "$50,000",
    image: "/images/impact/clean-water.jpg"
  },
  {
    id: 2,
    title: "Education for All",
    location: "South Asia",
    impact: "500 students supported",
    amount: "$75,000",
    image: "/images/impact/education-project.jpg"
  },
  {
    id: 3,
    title: "Medical Aid Program",
    location: "Latin America",
    impact: "1,000+ patients treated",
    amount: "$100,000",
    image: "/images/impact/medical-aid.jpg"
  }
];

export const SuccessStoriesSection = () => {
  return (
    <section className="mt-32">
      <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-16">
        Success Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-48">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-1">{story.title}</h3>
                <p className="text-sm text-white/90">{story.location}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  {story.impact}
                </span>
                <span className="text-red-950 dark:text-rose-50 font-bold">
                  {story.amount}
                </span>
              </div>
              <button 
                type="button"
                className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:gap-3 transition-all duration-300"
              >
                Read Full Story
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 