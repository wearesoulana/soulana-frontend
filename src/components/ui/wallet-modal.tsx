"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Image from "next/image";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const wallets = [
  {
    name: "Phantom",
    icon: "/images/wallet-icons/phantom.svg",
    adapter: "phantom"
  },
  {
    name: "Solflare",
    icon: "/images/wallet-icons/solflare.png",
    adapter: "solflare"
  }
];

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { select, wallets: adapters, connecting } = useWallet();

  const handleWalletSelect = async (adapterName: string) => {
    const adapter = adapters.find(a => a.adapter.name.toLowerCase() === adapterName);
    if (adapter) {
      select(adapter.adapter.name);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Select Your Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-950/50"
              onClick={() => handleWalletSelect(wallet.adapter)}
              disabled={connecting}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5">
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium">{wallet.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 