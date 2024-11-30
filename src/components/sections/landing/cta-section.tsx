import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Coins, Shield, ChevronRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-32 -mb-32">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900 via-red-950 to-red-900 dark:from-red-950 dark:via-black dark:to-red-950">
        {/* Enhanced background with dynamic pattern and multiple gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/landing/pattern.svg')] bg-repeat opacity-5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-800/50 via-red-900/50 to-transparent dark:from-red-900/30 dark:via-red-950/30 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
          
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Heart icon */}
            <div className="absolute -right-12 top-1/4 -translate-y-1/2 transform">
              <Heart className="w-64 h-64 text-white/5 dark:text-red-500/5 animate-pulse" />
            </div>
            {/* Coins icon */}
            <div className="absolute right-32 top-1/2 transform rotate-12">
              <Coins className="w-48 h-48 text-white/3 dark:text-red-500/10 animate-pulse delay-300" />
            </div>
            {/* Shield icon */}
            <div className="absolute right-8 bottom-1/4 transform -rotate-12">
              <Shield className="w-40 h-40 text-white/3 dark:text-red-500/10 animate-pulse delay-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-20 sm:px-12 sm:py-28 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block animate-fade-in">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 dark:bg-red-500/10 text-white dark:text-rose-100 text-sm font-medium mb-6">
                Join Our Community <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-rose-50 mb-6 leading-tight animate-fade-in-up">
              Transform Lives Through
              <span className="bg-gradient-to-r from-rose-100 to-white dark:from-red-500 dark:to-rose-200 bg-clip-text text-transparent"> Blockchain Giving</span>
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 dark:text-rose-100/80 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
              Join thousands of donors who are already creating positive change through secure and transparent blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-8 py-6 bg-white hover:bg-rose-50 text-red-950 dark:bg-red-500 dark:text-white dark:hover:bg-red-400 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                Start Donating
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10 dark:border-red-500 dark:text-rose-50 dark:hover:bg-red-500/10 hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 