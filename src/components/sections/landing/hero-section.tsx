"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto mt-16">
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-red-950 dark:text-rose-50 leading-tight">
        Touching{" "}
        <span className="relative inline-block">
          <span className="text-red-600 dark:text-red-500">souls</span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 dark:bg-red-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        </span>{" "}
        through giving
      </h1>
      <p className="text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl">
        Make a meaningful impact with instant, secure donations using Solana&apos;s
        Blink technology. Every contribution touches a life, every transaction builds trust.
      </p>
      <div className="flex gap-4 mt-4">
        <Button 
          size="lg" 
          className="gap-2 bg-red-950 hover:bg-red-900 dark:bg-rose-50 dark:hover:bg-rose-100 dark:text-red-950 transition-all duration-300 hover:scale-105 group"
          onClick={() => router.push('/donate')}
        >
          Start Donating
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="gap-2 border-red-300 dark:border-red-800 text-red-950 dark:text-rose-50 hover:bg-red-100/20 dark:hover:bg-red-950/20 transition-all duration-300 hover:scale-105"
          onClick={() => router.push('#how-it-works')}
        >
          Watch Demo
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 