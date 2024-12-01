"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Gift } from "lucide-react";
import { useRouter } from "next/navigation";

export const CTASection = () => {
  const router = useRouter();
  
  return (
    <section className="mt-32">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Enhanced background with dynamic pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/donation/gift-pattern.svg')] bg-repeat opacity-5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-100 via-red-200 to-red-100 dark:from-red-950 dark:via-red-900/90 dark:to-red-950 opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-black/10 dark:via-transparent dark:to-black/10" />
          
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 transform">
              <Gift className="w-64 h-64 text-red-300/20 dark:text-red-500/5 animate-pulse" />
            </div>
            <div className="absolute right-32 top-1/4 transform rotate-12">
              <Gift className="w-32 h-32 text-red-400/30 dark:text-red-500/10 animate-pulse delay-300" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-800/90 dark:text-rose-100/80 max-w-2xl mx-auto mb-8">
            Start your donation journey today and help make the world a better place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-500 text-white dark:bg-red-500 dark:text-white dark:hover:bg-red-400 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl"
              onClick={() => router.push('/donate')}
            >
              Start Donating
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-rose-50 dark:hover:bg-red-500/10 hover:scale-105 transition-all duration-300"
              onClick={() => router.push('/how-it-works/donation-process')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 