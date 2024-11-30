import { Heart, Shield, Clock } from "lucide-react";

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
      <div className="group flex flex-col items-center p-8 rounded-2xl border bg-white/30 dark:bg-black/30 border-red-200 dark:border-red-900 transition-all duration-300 hover:scale-105">
        <Heart className="w-8 h-8 text-red-600 dark:text-red-500 mb-4" />
        <h3 className="text-3xl font-bold text-red-950 dark:text-rose-50">$10M+</h3>
        <p className="text-red-800/80 dark:text-rose-100/80">Total Donations</p>
      </div>
      <div className="group flex flex-col items-center p-8 rounded-2xl border bg-white/30 dark:bg-black/30 border-red-200 dark:border-red-900 transition-all duration-300 hover:scale-105">
        <Shield className="w-8 h-8 text-red-600 dark:text-red-500 mb-4" />
        <h3 className="text-3xl font-bold text-red-950 dark:text-rose-50">1000+</h3>
        <p className="text-red-800/80 dark:text-rose-100/80">Verified Charities</p>
      </div>
      <div className="group flex flex-col items-center p-8 rounded-2xl border bg-white/30 dark:bg-black/30 border-red-200 dark:border-red-900 transition-all duration-300 hover:scale-105">
        <Clock className="w-8 h-8 text-red-600 dark:text-red-500 mb-4" />
        <h3 className="text-3xl font-bold text-red-950 dark:text-rose-50">&lt;1s</h3>
        <p className="text-red-800/80 dark:text-rose-100/80">Transaction Time</p>
      </div>
    </div>
  );
}; 