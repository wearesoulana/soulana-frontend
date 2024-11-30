"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { WalletModal } from "./wallet-modal";

export function WalletButton() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { connected, disconnect, publicKey } = useWallet();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setShowWalletModal(true);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
      >
        <Wallet className="h-4 w-4" />
        {connected 
          ? formatAddress(publicKey?.toBase58() || "")
          : "Connect Wallet"
        }
      </Button>

      <WalletModal 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal} 
      />
    </>
  );
} 