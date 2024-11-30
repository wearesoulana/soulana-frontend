import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const VideoSection = () => {
  return (
    <div className="mt-32 text-center">
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 mb-6">
          See How It Works
        </h2>
        <p className="text-xl text-red-800/80 dark:text-rose-100/80">
          Watch how our platform leverages Solana&apos;s blockchain technology to make charitable giving more efficient, transparent, and impactful than ever before.
        </p>
      </div>

      <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-white/30 dark:bg-black/30 border border-red-200 dark:border-red-900 group hover:scale-[1.02] transition-all duration-300">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Button 
            size="lg"
            variant="outline" 
            className="relative z-10 gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 group-hover:scale-110 transition-all duration-300"
          >
            <Play className="h-6 w-6" />
            Watch Demo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto mb-8">
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50 mb-2">
            Instant Transactions
          </h3>
          <p className="text-red-800/80 dark:text-rose-100/80">
            Experience lightning-fast donations with Solana&apos;s sub-second finality.
          </p>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50 mb-2">
            Complete Transparency
          </h3>
          <p className="text-red-800/80 dark:text-rose-100/80">
            Track every donation on the blockchain with full visibility and verification.
          </p>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50 mb-2">
            Minimal Fees
          </h3>
          <p className="text-red-800/80 dark:text-rose-100/80">
            More of your donation goes to the cause with near-zero transaction costs.
          </p>
        </div>
      </div>
    </div>
  );
}; 