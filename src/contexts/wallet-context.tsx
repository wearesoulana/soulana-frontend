"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // This is a mock implementation - replace with actual wallet connection logic
      if (typeof window.solana !== "undefined") {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        setIsConnected(true);
      } else {
        throw new Error("Solana object not found! Get Phantom!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    if (typeof window.solana !== "undefined") {
      window.solana.disconnect();
    }
    setWalletAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
} 