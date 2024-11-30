"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50 transition-all duration-300">
      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-9xl font-bold text-red-600 dark:text-red-500">
            404
          </h1>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-red-950 dark:text-rose-50">
              Page Not Found
            </h2>
            <p className="text-lg text-red-800/80 dark:text-rose-100/80 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              asChild
              className="gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 border-red-300 dark:border-red-800 text-red-950 dark:text-rose-50 hover:bg-red-100/20 dark:hover:bg-red-950/20"
            >
              <button 
                type="button"
                onClick={() => window.history.back()}
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 