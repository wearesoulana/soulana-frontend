/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { 
  Connection, 
  Transaction, 
  PublicKey, 
  LAMPORTS_PER_SOL, 
  clusterApiUrl, 
  SystemProgram,
} from "@solana/web3.js";
import { WalletButton } from "@/components/ui/wallet-button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/wallet-context";
import { TransactionTracker } from "@/components/sections/how-it-works/donation-process/transaction-tracker";
import { Loader2, Heart } from "lucide-react";

// Blink authority public key

// Initialize connection explicitly with devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  target: string;
  raised: string;
  minDonation: number;
  wallet: PublicKey;
  isNew?: boolean;
  isUrgent?: boolean;
}

interface StoredTransaction {
  signature: string;
  amount: number;
  timestamp: Date;
  fromAddress: string;
  toAddress: string;
  projectId: number;
  projectTitle: string;
  status: 'started' | 'pending' | 'completed' | 'failed';
}

// Helper function to calculate progress percentage
const calculateProgress = (raised: string, target: string): number => {
  const raisedAmount = Number.parseFloat(raised.split(" ")[0]);
  const targetAmount = Number.parseFloat(target.split(" ")[0]);
  return Math.min(Math.round((raisedAmount / targetAmount) * 100), 100);
};

// Progress badge component
const ProgressBadge = ({ progress }: { progress: number }) => {
  let bgColor = "bg-red-100 dark:bg-red-900/30";
  let textColor = "text-red-600 dark:text-red-400";

  if (progress >= 75) {
    bgColor = "bg-green-100 dark:bg-green-900/30";
    textColor = "text-green-600 dark:text-green-400";
  } else if (progress >= 50) {
    bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
    textColor = "text-yellow-600 dark:text-yellow-400";
  }

  return (
    <div className={`rounded-full px-3 py-1 ${bgColor}`}>
      <span className={`text-sm font-medium ${textColor}`}>
        {progress}% Funded
      </span>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: "started" | "completed" | "pending" | "failed" }) => {
  const statusConfig = {
    started: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      label: "Started"
    },
    completed: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      label: "Completed"
    },
    pending: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
      label: "Pending"
    },
    failed: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      label: "Failed"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`rounded-full px-3 py-1 ${config.bg}`}>
      <span className={`text-sm font-medium ${config.text}`}>
        {config.label}
      </span>
    </div>
  );
};

// New and Urgent badges
const NewBadge = () => (
  <div className="rounded-full px-3 py-1 bg-green-100 dark:bg-green-900/30">
    <span className="text-sm font-medium text-green-600 dark:text-green-400">
      New
    </span>
  </div>
);

const UrgentBadge = () => (
  <div className="rounded-full px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30">
    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
      Urgent
    </span>
  </div>
);

const projects: Project[] = [
  {
    id: 1,
    title: "EduChain Scholarships",
    description: "Scholarship support for students seeking blockchain technology education.",
    image: "https://i.ibb.co/x81s9mN/educhainscholar.png",
    target: "100 SOL",
    raised: "45 SOL",
    minDonation: 0.001,
    wallet: new PublicKey("F1rstn82GYYuWVPYBg7YKUZ2fZskDFg27ocXBx88pcgW"),
    isNew: true,
  },
  {
    id: 2,
    title: "GreenSol Reforestation",
    description: "Support reforestation efforts to combat climate change.",
    image: "https://i.ibb.co/7GHVvwP/greensolrefores.png",
    target: "200 SOL",
    raised: "45 SOL",
    minDonation: 0.001,
    wallet: new PublicKey("F1rstn82GYYuWVPYBg7YKUZ2fZskDFg27ocXBx88pcgW"),
    isUrgent: true,
  }
];

export function DonationProjects() {
  const { isConnected: connected, walletAddress } = useWallet();
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [balance, setBalance] = useState<number | null>(null);
  
  // Initialize donationAmounts with minimum donation amounts for each project
  const [donationAmounts, setDonationAmounts] = useState<Record<number, number>>(() => {
    return projects.reduce((acc, project) => {
      acc[project.id] = project.minDonation;
      return acc;
    }, {} as Record<number, number>);
  });

  // Convert walletAddress string to PublicKey when needed
  const publicKey = useMemo(() => 
    walletAddress ? new PublicKey(walletAddress) : null
  , [walletAddress]);

  // Update useEffect to use our wallet context
  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();
    const intervalId = setInterval(fetchBalance, 5000);
    return () => clearInterval(intervalId);
  }, [connected, publicKey]);

  const handleAmountChange = (projectId: number, value: string) => {
    const amount = Number.parseFloat(value);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;

    // Validate and update amount
    if (!Number.isNaN(amount)) {
      if (amount >= project.minDonation) {
        setDonationAmounts(prev => ({ ...prev, [projectId]: amount }));
      }
    }
  };

  const handleDonate = async (projectId: number) => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    const donationAmount = donationAmounts[projectId] || 0;
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      toast.error("Project not found");
      return;
    }

    if (donationAmount < project.minDonation) {
      toast.error(`Minimum donation is ${project.minDonation} SOL`);
      return;
    }

    try {
      setLoading(prev => ({ ...prev, [projectId]: true }));

      if (balance === null || balance < donationAmount) {
        throw new Error(`Insufficient balance. You need at least ${donationAmount} SOL`);
      }

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: project.wallet,
          lamports: donationAmount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      try {
        if (!window.solana) {
          throw new Error('Solana wallet not found');
        }
        const signedTransaction = await window.solana.signTransaction(transaction);
        
        const signature = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );

        toast.info("Transaction sent! Waiting for confirmation...");

        // Create initial donation record
        const donationData = {
          signature,
          amount: donationAmount,
          timestamp: new Date(),
          fromAddress: publicKey.toBase58(),
          toAddress: project.wallet.toBase58(),
          projectId: project.id,
          projectTitle: project.title,
          status: 'started' as const
        };

        // Store in localStorage for immediate feedback
        const existingTransactions = JSON.parse(localStorage.getItem('donations') || '[]');
        const updatedTransactions = [donationData, ...existingTransactions].slice(0, 5);
        localStorage.setItem('donations', JSON.stringify(updatedTransactions));
        window.dispatchEvent(new CustomEvent('newDonation', { detail: updatedTransactions }));

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction(signature);

        if (confirmation?.value?.err) {
          // Update status to failed
          const currentTransactionsFailed = JSON.parse(localStorage.getItem('donations') || '[]');
          const updatedTransactionsFailed = currentTransactionsFailed.map((tx: StoredTransaction) => 
            tx.signature === signature ? { ...tx, status: 'failed' as const } : tx
          );
          localStorage.setItem('donations', JSON.stringify(updatedTransactionsFailed));
          window.dispatchEvent(new CustomEvent('newDonation', { detail: updatedTransactionsFailed }));
          throw new Error("Transaction failed to confirm");
        }

        // Update transaction status to completed
        const currentTransactionsCompleted = JSON.parse(localStorage.getItem('donations') || '[]');
        const updatedTransactionsCompleted = currentTransactionsCompleted.map((tx: StoredTransaction) => 
          tx.signature === signature ? { ...tx, status: 'completed' as const } : tx
        );
        localStorage.setItem('donations', JSON.stringify(updatedTransactionsCompleted));
        window.dispatchEvent(new CustomEvent('newDonation', { detail: updatedTransactionsCompleted }));

        // Store donation in database and calculate tokens
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: publicKey.toBase58(),
            donation: {
              ...donationData,
              status: 'completed',
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to store donation');
        }

        const { tokenAmount } = await response.json();
        toast.success(
          `Successfully donated ${donationAmount} SOL to ${project.title}! You earned ${tokenAmount} CCT tokens!`
        );

        // Refresh balances
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);

      } catch (error) {
        console.error("Transaction error:", error);
        throw new Error("Failed to sign or send transaction");
      }

    } catch (error) {
      console.error("Donation error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to process donation");
      }
    } finally {
      setLoading(prev => ({ ...prev, [projectId]: false }));
    }
  };

  const getButtonText = (projectId: number, connected: boolean, loading: boolean, balance: number | null): string => {
    if (loading) return "Processing...";
    if (!connected) return "Connect Wallet";
    if (balance === null) return "Loading Balance...";
    const amount = donationAmounts[projectId] || 0;
    if (balance < amount) return "Insufficient Balance";
    return "Donate Now";
  };

  return (
    <section className="mt-10 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-4">
          Donate to Projects
        </h1>
        <p className="text-red-800/80 dark:text-rose-100/80 text-center mb-6">
          Choose a project to support and make your impact
        </p>
        
        {/* Wallet Connection Section */}
        <div className="text-center mb-10 space-y-3 bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 max-w-md mx-auto">
          <WalletButton />
          {connected && publicKey && (
            <div className="space-y-4">
              {/* Balance Information */}
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <p className="text-sm font-medium text-red-800/80 dark:text-rose-100/80">
                  Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
                </p>
                <p className="text-xs text-red-600/60 dark:text-rose-200/60">
                  Min donation: 0.001 SOL
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Column - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 backdrop-blur-sm"
              >
                {/* Project content */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 space-y-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.isNew && <NewBadge />}
                      {project.isUrgent && <UrgentBadge />}
                      <StatusBadge status="started" />
                      <ProgressBadge progress={calculateProgress(project.raised, project.target)} />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-red-950 dark:text-rose-50">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-red-800/80 dark:text-rose-100/80">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-red-800/60 dark:text-rose-100/60">Raised</span>
                        <span className="font-medium text-red-950 dark:text-rose-50">{project.raised}</span>
                      </div>
                      <div className="h-2 bg-red-100 dark:bg-red-950/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-500"
                          style={{ width: `${calculateProgress(project.raised, project.target)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-800/60 dark:text-rose-100/60">Target</span>
                        <span className="font-medium text-red-950 dark:text-rose-50">{project.target}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          type="number"
                          min={project.minDonation}
                          step={0.001}
                          value={donationAmounts[project.id] || project.minDonation}
                          onChange={(e) => handleAmountChange(project.id, e.target.value)}
                          className="w-full"
                          placeholder="Amount in SOL"
                        />
                        <p className="mt-1 text-xs text-red-800/60 dark:text-rose-100/60">
                          Minimum donation: {project.minDonation} SOL
                        </p>
                      </div>
                      <Button
                        className="bg-red-600 hover:bg-red-500 text-white dark:bg-red-500 dark:hover:bg-red-400"
                        disabled={!connected || loading[project.id]}
                        onClick={() => handleDonate(project.id)}
                      >
                        {loading[project.id] ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Heart className="mr-2 h-4 w-4" />
                            {getButtonText(project.id, connected, loading[project.id], balance)}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction Tracker Column */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <TransactionTracker />
          </div>
        </div>
      </div>
    </section>
  );
}