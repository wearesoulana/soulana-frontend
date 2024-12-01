interface SolanaProvider {
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => void;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
}

declare global {
  interface Window {
    solana?: SolanaProvider;
  }
}

export {}; 