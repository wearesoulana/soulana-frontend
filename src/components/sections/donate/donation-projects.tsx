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
    <div className={`absolute top-4 right-4 ${bgColor} rounded-full px-3 py-1 z-10`}>
      <span className={`text-sm font-medium ${textColor}`}>
        {progress}% Funded
      </span>
    </div>
  );
};

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
  }
];

export function DonationProjects() {
  const { isConnected: connected, walletAddress } = useWallet();
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [balance, setBalance] = useState<number | null>(null);
  const [, setRecipientBalance] = useState<Record<string, number>>({});
  
  // Initialize donationAmounts with minimum donation amounts for each project
  const [donationAmounts, setDonationAmounts] = useState<Record<number, number>>(() => {
    return projects.reduce((acc, project) => {
      acc[project.id] = project.minDonation;
      return acc;
    }, {} as Record<number, number>);
  });

  // Wrap publicKey initialization in useMemo
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

  useEffect(() => {
    const fetchRecipientBalances = async () => {
      try {
        const balances = await Promise.all(
          projects.map(async (project) => {
            const balance = await connection.getBalance(project.wallet);
            return [project.wallet.toBase58(), balance / LAMPORTS_PER_SOL];
          })
        );
        setRecipientBalance(Object.fromEntries(balances));
      } catch (error) {
        console.error('Error fetching recipient balances:', error);
      }
    };

    fetchRecipientBalances();
    const intervalId = setInterval(fetchRecipientBalances, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDonate = async (projectId: number) => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    const donationAmount = donationAmounts[projectId] || 0;
    const project = projects.find(p => p.id === projectId);
    
    console.log('Starting donation process...');
    console.log('Project ID:', projectId);
    console.log('Donation Amount:', donationAmount);
    console.log('Project:', project);
    console.log('Wallet Balance:', balance);
    console.log('Recipient Wallet:', project?.wallet.toBase58());
    
    // Log initial balances
    const initialSenderBalance = await connection.getBalance(publicKey);
    const initialRecipientBalance = project ? await connection.getBalance(project.wallet) : 0;
    console.log('Initial Sender Balance:', initialSenderBalance / LAMPORTS_PER_SOL);
    console.log('Initial Recipient Balance:', initialRecipientBalance / LAMPORTS_PER_SOL);

    if (!project) {
      console.log('Error: Project not found');
      toast.error("Project not found");
      return;
    }

    if (donationAmount < project.minDonation) {
      console.log('Error: Donation amount below minimum', {
        provided: donationAmount,
        minimum: project.minDonation
      });
      toast.error(`Minimum donation is ${project.minDonation} SOL`);
      return;
    }

    try {
      setLoading(prev => ({ ...prev, [projectId]: true }));

      if (balance === null || balance < donationAmount) {
        console.log('Error: Insufficient balance', {
          required: donationAmount,
          available: balance
        });
        throw new Error(`Insufficient balance. You need at least ${donationAmount} SOL`);
      }

      console.log('Creating transaction...');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: project.wallet,
          lamports: donationAmount * LAMPORTS_PER_SOL,
        })
      );

      console.log('Getting latest blockhash...');
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      try {
        console.log('Requesting wallet signature...');
        // Check if window.solana exists before accessing it
        if (!window.solana) {
          throw new Error('Solana wallet not found');
        }
        const signedTransaction = await window.solana.signTransaction(transaction);
        
        console.log('Sending transaction...');
        const signature = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );

        console.log('Transaction sent:', signature);
        console.log('Transaction URL:', `https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        toast.info("Transaction sent! Waiting for confirmation...");

        console.log('Waiting for confirmation...');
        const confirmation = await connection.confirmTransaction(signature);

        if (confirmation?.value?.err) {
          console.log('Error: Transaction failed to confirm', confirmation.value.err);
          throw new Error("Transaction failed to confirm");
        }
        
        // Wait a bit for the network to propagate the change
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check final balances
        const finalSenderBalance = await connection.getBalance(publicKey);
        const finalRecipientBalance = await connection.getBalance(project.wallet);
        
        console.log('Final Sender Balance:', finalSenderBalance / LAMPORTS_PER_SOL);
        console.log('Final Recipient Balance:', finalRecipientBalance / LAMPORTS_PER_SOL);
        console.log('Sender Balance Change:', (finalSenderBalance - initialSenderBalance) / LAMPORTS_PER_SOL);
        console.log('Recipient Balance Change:', (finalRecipientBalance - initialRecipientBalance) / LAMPORTS_PER_SOL);

        // Verify the transaction
        const txInfo = await connection.getTransaction(signature, {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0
        });
        
        console.log('Transaction Info:', txInfo);
        
        if (!txInfo) {
          throw new Error("Failed to fetch transaction info");
        }

        toast.success(`Successfully donated ${donationAmount} SOL to ${project.title}!`);
        
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

  const handleAmountChange = (projectId: number, value: string) => {
    const amount = Number.parseFloat(value);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;

    // Validate and update amount
    if (!Number.isNaN(amount)) {
      if (amount >= project.minDonation) {
        setDonationAmounts(prev => ({
          ...prev,
          [projectId]: amount
        }));
      } else {
        setDonationAmounts(prev => ({
          ...prev,
          [projectId]: project.minDonation
        }));
        toast.error(`Minimum donation is ${project.minDonation} SOL`);
      }
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
        <p className="text-red-800/80 dark:text-rose-100/80 text-center mb-4">
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

              {/* Wallet Address */}
              {/* <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm font-medium text-red-800/80 dark:text-rose-100/80">
                    Wallet Address
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
                    title="Copy full address"
                  >
                    <Copy className="h-4 w-4 text-red-800/60 dark:text-rose-100/60" />
                  </button>
                </div>
                <p className="text-xs font-mono text-red-600/80 dark:text-rose-200/80 mt-1">
                  {publicKey.toBase58()}
                </p>
              </div> */}

              {/* Network Information */}
              {/* <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <p className="text-sm font-medium text-red-800/80 dark:text-rose-100/80">
                  Network: Devnet
                </p>
                <p className="text-xs text-red-600/60 dark:text-rose-200/60">
                  This is a test network for development
                </p>
              </div> */}

              {/* Get Test SOL Instructions */}
              {/* <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg space-y-2">
                <p className="text-sm font-medium text-red-800/80 dark:text-rose-100/80">
                  Need test SOL?
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-red-600/80 dark:text-rose-200/80">
                    1. Install Solana CLI:
                  </p>
                  <code className="block text-xs font-mono bg-red-100/50 dark:bg-red-900/50 p-2 rounded">
                    sh -c "$(curl -sSfL https://release.solana.com/v1.17.9/install)"
                  </code>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-red-600/80 dark:text-rose-200/80">
                    2. Get free devnet SOL:
                  </p>
                  <div className="relative">
                    <code className="block text-xs font-mono bg-red-100/50 dark:bg-red-900/50 p-2 rounded">
                      solana airdrop 2 {publicKey.toBase58()} --url devnet
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `solana airdrop 2 ${publicKey.toBase58()} --url devnet`
                        );
                        toast.success("Command copied to clipboard!");
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-red-200/50 dark:hover:bg-red-800/50 rounded"
                      title="Copy command"
                    >
                      <Copy className="h-3 w-3 text-red-800/60 dark:text-rose-100/60" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-red-600/60 dark:text-rose-200/60">
                  You can request up to 2 SOL every few seconds
                </p>
              </div> */}

              {/* Quick Links */}
              {/* <div className="flex gap-2 justify-center text-xs">
                <a
                  href="https://docs.solana.com/cli/install-solana-cli-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  CLI Docs
                </a>
                <span className="text-red-300">•</span>
                <a
                  href="https://explorer.solana.com/?cluster=devnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Explorer
                </a>
                <span className="text-red-300">•</span>
                <a
                  href="https://faucet.solana.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Faucet
                </a>
              </div> */}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="relative bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6"
            >
              <ProgressBadge progress={calculateProgress(project.raised, project.target)} />
              
              {/* Project Content */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Project Image */}
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>

                {/* Project Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-red-950 dark:text-rose-50 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-red-800/80 dark:text-rose-100/80 mb-4">
                      {project.description}
                    </p>
                    
                    {/* Progress Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-red-600 dark:text-red-400">
                          Target: {project.target}
                        </span>
                        <span className="text-red-600 dark:text-red-400">
                          Raised: {project.raised}
                        </span>
                      </div>
                      <div className="w-full bg-red-100 dark:bg-red-900/30 rounded-full h-2">
                        <div 
                          className="bg-red-600 dark:bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${calculateProgress(project.raised, project.target)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donation Section */}
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center text-sm text-red-800/60 dark:text-rose-100/60">
                      <span>Minimum donation: {project.minDonation} SOL</span>
                      <span className="font-mono">
                        Wallet: {project.wallet.toBase58().slice(0, 4)}...{project.wallet.toBase58().slice(-4)}
                      </span>
                    </div>
                    
                    {/* Amount Input */}
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min={project.minDonation}
                        step={0.001}
                        value={donationAmounts[project.id]}
                        onChange={(e) => handleAmountChange(project.id, e.target.value)}
                        placeholder={`Min: ${project.minDonation} SOL`}
                        className="flex-1"
                      />
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                        onClick={() => handleDonate(project.id)}
                        disabled={
                          !connected || 
                          loading[project.id] || 
                          balance === null || 
                          !donationAmounts[project.id] ||
                          (balance < donationAmounts[project.id])
                        }
                      >
                        {getButtonText(
                          project.id, 
                          connected, 
                          loading[project.id], 
                          balance
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}