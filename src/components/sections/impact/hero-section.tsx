import React from "react";

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto animate-fade-in-up mt-16">
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-red-950 dark:text-rose-50 leading-tight">
        Our Global Impact
      </h1>
      <p className="text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl">
        See how blockchain technology is transforming charitable giving and making a real difference worldwide.
      </p>
    </div>
  );
}; 