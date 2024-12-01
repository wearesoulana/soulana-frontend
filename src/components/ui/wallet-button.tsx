"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/contexts/wallet-context";

export function WalletButton() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();

  const handleClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected
        ? `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
} 