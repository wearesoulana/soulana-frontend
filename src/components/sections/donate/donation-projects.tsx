"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
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
import { Copy } from "lucide-react";

// Blink authority public key
const BLINK_AUTHORITY = new PublicKey("9MNofMMhUFiC9gPwaYHJC6FMeEefzvkfj1p6acHgSf8K");

// Initialize connection explicitly with devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Project donation receiver address (should match the one in the API)
const DONATION_RECEIVER = new PublicKey("9MNofMMhUFiC9gPwaYHJC6FMeEefzvkfj1p6acHgSf8K");

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
    wallet: DONATION_RECEIVER,
  }
];

export function DonationProjects() {
  const { connected, publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [balance, setBalance] = useState<number | null>(null);

  // Fetch balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
          console.log('Wallet Address:', publicKey.toBase58());
          console.log('Current Network: Devnet');
          console.log('To get devnet SOL, run:');
          console.log(`solana airdrop 2 ${publicKey.toBase58()} --url devnet`);
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();
    // Set up balance refresh interval
    const intervalId = setInterval(fetchBalance, 5000);
    return () => clearInterval(intervalId);
  }, [connected, publicKey]);

  const handleDonate = async (projectId: number, minDonation: number) => {
    if (!connected || !publicKey || !signTransaction) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, [projectId]: true }));

      // Check if we have a valid balance
      if (balance === null) {
        throw new Error("Unable to fetch wallet balance");
      }

      // Check if wallet has enough SOL
      if (balance < minDonation) {
        throw new Error(`Insufficient balance. You need at least ${minDonation} SOL. Current balance: ${balance.toFixed(4)} SOL`);
      }

      const project = projects.find(p => p.id === projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      toast.info(`Preparing donation of ${minDonation} SOL to ${project.title}`);

      // Call the Blink route to get transaction
      const response = await fetch("/api/blink-chain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "donate",
          amount: minDonation.toString(),
          projectId: projectId,
          projectWallet: project.wallet.toBase58(),
          clientWallet: publicKey.toBase58(),
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to process donation");
      }

      const { transaction: serializedTransaction } = responseData;
      
      if (!serializedTransaction) {
        throw new Error("No transaction received from server");
      }

      // Deserialize and sign the transaction
      const transaction = Transaction.from(
        Buffer.from(serializedTransaction, "base64")
      );

      // Set the fee payer and signer
      transaction.feePayer = publicKey;

      // Update all signing accounts to use the connected wallet
      for (const instruction of transaction.instructions) {
        if (instruction.programId.equals(SystemProgram.programId)) {
          instruction.keys = instruction.keys.map(key => {
            if (key.isSigner) {
              return {
                ...key,
                pubkey: publicKey,
              };
            }
            return key;
          });
        }
      }

      // Sign the transaction
      const signedTransaction = await signTransaction(transaction);

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      toast.success("Transaction sent! Waiting for confirmation...");

      // Wait for confirmation with a timeout
      const confirmationPromise = connection.confirmTransaction(signature);
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("Transaction confirmation timeout")), 30000)
      );

      const confirmation = await Promise.race([
        confirmationPromise,
        timeoutPromise,
      ]);

      if (confirmation?.value?.err) {
        throw new Error("Transaction failed to confirm");
      }

      toast.success(`Thank you for donating ${minDonation} SOL to ${project.title}! Your contribution helps make a difference.`);
      
      // Refresh balance after successful donation
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);
      
    } catch (error) {
      console.error("Donation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process donation");
    } finally {
      setLoading(prev => ({ ...prev, [projectId]: false }));
    }
  };

  const getButtonText = (projectId: number, connected: boolean, loading: boolean, balance: number | null, minDonation: number): string => {
    if (loading) return "Processing...";
    if (!connected) return "Connect Wallet";
    if (balance === null) return "Loading Balance...";
    if (balance < minDonation) return "Insufficient Balance";
    return "Donate Now";
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      toast.success("Wallet address copied to clipboard!");
    }
  };

  return (
    <section className="mt-10 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-4">
          Donation Projects
        </h1>
        
        {/* Wallet Connection Section */}
        <div className="text-center mb-10 space-y-3 bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 max-w-md mx-auto">
          <WalletButton />
          {/* {connected && publicKey && (
            <div className="space-y-2">
              <p className="text-sm text-red-800/80 dark:text-rose-100/80">
                Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xs text-red-800/60 dark:text-rose-100/60 font-mono">
                  Address: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
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
              <p className="text-xs text-red-800/60 dark:text-rose-100/60">
                Network: Devnet
              </p>
              <div className="bg-red-100/30 dark:bg-red-900/30 rounded-lg p-2 mt-2">
                <p className="text-xs text-red-800/60 dark:text-rose-100/60">
                  Get test SOL:
                </p>
                <code className="text-xs block mt-1 font-mono text-red-800/80 dark:text-rose-100/80">
                  solana airdrop 2 {publicKey.toBase58()} --url devnet
                </code>
              </div>
            </div>
          )} */}
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
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                      onClick={() => handleDonate(project.id, project.minDonation)}
                      disabled={!connected || loading[project.id] || balance === null || (balance < project.minDonation)}
                    >
                      {getButtonText(project.id, connected, loading[project.id], balance, project.minDonation)}
                    </Button>
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