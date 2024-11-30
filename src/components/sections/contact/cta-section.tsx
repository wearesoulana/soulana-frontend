import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="mt-32">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Enhanced background with dynamic pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/contact/message-pattern.svg')] bg-repeat opacity-5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-950 to-red-900 dark:from-red-950 dark:via-red-900/90 dark:to-red-950 opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
          
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 transform">
              <MessageCircle className="w-64 h-64 text-white/5 dark:text-red-500/5 animate-pulse" />
            </div>
            <div className="absolute right-32 top-1/4 transform rotate-12">
              <MessageCircle className="w-32 h-32 text-white/3 dark:text-red-500/10 animate-pulse delay-300" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-rose-50 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 dark:text-rose-100/80 max-w-2xl mx-auto mb-8">
            Our team is always here to help. Schedule a call with one of our experts.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white hover:bg-rose-50 text-red-950 dark:bg-red-500 dark:text-white dark:hover:bg-red-400 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Schedule a Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 dark:border-red-500 dark:text-rose-50 dark:hover:bg-red-500/10 hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 