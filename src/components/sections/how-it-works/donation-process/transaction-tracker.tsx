/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Transaction {
  signature: string;
  amount: number;
  timestamp: Date;
  fromAddress: string;
  toAddress: string;
  projectId: number;
  projectTitle: string;
  status: 'started' | 'pending' | 'completed' | 'failed';
}

export const TransactionTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Load transactions from localStorage
    const loadTransactions = () => {
      const storedTransactions = localStorage.getItem('donations');
      if (storedTransactions) {
        const parsed = JSON.parse(storedTransactions);
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        setTransactions(parsed.map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp)
        })));
      }
    };

    loadTransactions();

    // Listen for instant updates
    const handleNewDonation = (event: CustomEvent<Transaction[]>) => {
      setTransactions(event.detail.map(tx => ({
        ...tx,
        timestamp: new Date(tx.timestamp)
      })));
    };

    window.addEventListener('newDonation', handleNewDonation as EventListener);
    window.addEventListener('storage', loadTransactions);

    return () => {
      window.removeEventListener('newDonation', handleNewDonation as EventListener);
      window.removeEventListener('storage', loadTransactions);
    };
  }, []);

  return (
    <motion.div 
      className="bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-red-950 dark:text-rose-50 mb-4">
        Recent Donations
      </h3>
      
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-center text-red-800/60 dark:text-rose-100/60 py-8">
            No recent transactions found
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            {transactions.map((tx) => (
              <motion.div 
                key={tx.signature}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/50 dark:bg-black/50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-red-950 dark:text-rose-50">
                    {tx.amount.toFixed(4)} SOL
                  </span>
                  {tx.status === 'started' ? (
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Starting</span>
                    </div>
                  ) : tx.status === 'pending' ? (
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Pending</span>
                    </div>
                  ) : tx.status === 'completed' ? (
                    <Link
                      href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                    >
                      <span className="text-sm">View</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : tx.status === 'failed' ? (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <span className="text-sm">Failed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <span className="text-sm">Unknown</span>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-red-800/60 dark:text-rose-100/60">
                  <p>Project: {tx.projectTitle}</p>
                  <p>From: {tx.fromAddress.slice(0, 4)}...{tx.fromAddress.slice(-4)}</p>
                  <p>Time: {tx.timestamp.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}; 