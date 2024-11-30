"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  History,
  ArrowRight,
  Wallet,
  ChevronDown,
  ChevronUp
} from "lucide-react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: "token-what",
    question: "What is the Soulana Token?",
    answer: "Soulana Token (CCT) is a governance and utility token that rewards donors for their charitable contributions. When you make a donation through our platform, you automatically receive tokens worth 1% of your donation amount."
  },
  {
    id: "token-earn",
    question: "How do I earn tokens?",
    answer: "You earn tokens automatically when you make donations through our platform. For every donation you make, you receive tokens worth 1% of your donation amount. For example, if you donate $100, you'll receive $1 worth of CCT tokens."
  },
  {
    id: "token-use",
    question: "What can I do with my tokens?",
    answer: "Soulana tokens can be used for various purposes: participate in governance voting, receive exclusive rewards, get priority access to new features, and potentially earn staking rewards in the future."
  },
  {
    id: "token-calculation",
    question: "How are token rewards calculated?",
    answer: "Token rewards are calculated based on the USD value of your donation at the time of the transaction. You receive 1% of your donation amount in tokens, valued at the current token price."
  },
  {
    id: "token-receive",
    question: "When do I receive my tokens?",
    answer: "Tokens are distributed automatically to your connected wallet immediately after your donation is confirmed on the blockchain. There's no need to claim them manually."
  },
  {
    id: "token-transfer",
    question: "Can I transfer my tokens?",
    answer: "Yes, CCT tokens are standard Solana tokens that can be freely transferred between wallets. However, we encourage holding tokens to participate in governance and earn potential rewards."
  },
  {
    id: "token-minimum",
    question: "Is there a minimum donation to earn tokens?",
    answer: "There is no minimum donation amount to earn tokens. You'll receive 1% of your donation amount in tokens regardless of the donation size."
  },
  {
    id: "token-disconnect",
    question: "What happens to my tokens if I disconnect my wallet?",
    answer: "Your tokens remain safely stored on the blockchain and linked to your wallet address. You can always reconnect your wallet to access them again."
  }
];

export default function TokenRewardsPage() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<string | null>(null);

  // Mock data - replace with real data from your backend
  const stats = {
    totalTokens: "1,000,000",
    circulatingSupply: "250,000",
    holders: "1,234",
    price: "$0.15",
    marketCap: "$150,000",
    totalDonations: "$500,000"
  };

  const userStats = {
    tokenBalance: "0",
    pendingRewards: "0",
    totalDonated: "$0",
    lastDonation: "Never"
  };

  const toggleFaq = (id: string) => {
    setOpenFaqIndex(openFaqIndex === id ? null : id);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-16">
            <h1 className="text-4xl font-bold mb-4 text-red-950 dark:text-rose-50">
              Soulana Token Rewards
            </h1>
            <p className="text-lg text-red-800/60 dark:text-rose-100/60 mb-8">
              Earn tokens by making donations and participate in governance
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Connect Wallet <Wallet className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Token Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Total Supply</p>
                  <h3 className="text-2xl font-bold text-red-950 dark:text-rose-50 mt-1">{stats.totalTokens}</h3>
                </div>
                <Coins className="h-6 w-6 text-red-600" />
              </div>
            </Card>

            <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Token Price</p>
                  <h3 className="text-2xl font-bold text-red-950 dark:text-rose-50 mt-1">{stats.price}</h3>
                </div>
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </Card>

            <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Total Holders</p>
                  <h3 className="text-2xl font-bold text-red-950 dark:text-rose-50 mt-1">{stats.holders}</h3>
                </div>
                <Users className="h-6 w-6 text-red-600" />
              </div>
            </Card>
          </div>

          {/* User Stats Section */}
          <Card className="p-8 mb-12 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-red-950 dark:text-rose-50">Your Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Token Balance</p>
                <p className="text-xl font-bold text-red-950 dark:text-rose-50 mt-1">{userStats.tokenBalance}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Pending Rewards</p>
                <p className="text-xl font-bold text-red-950 dark:text-rose-50 mt-1">{userStats.pendingRewards}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Total Donated</p>
                <p className="text-xl font-bold text-red-950 dark:text-rose-50 mt-1">{userStats.totalDonated}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800/60 dark:text-rose-100/60">Last Donation</p>
                <p className="text-xl font-bold text-red-950 dark:text-rose-50 mt-1">{userStats.lastDonation}</p>
              </div>
            </div>
          </Card>

          {/* How It Works Section */}
          <Card className="p-8 mb-12 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-red-950 dark:text-rose-50">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-950 dark:text-rose-50">Make a Donation</h3>
                <p className="text-red-800/60 dark:text-rose-100/60">
                  Donate to your chosen cause through our platform
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-950 dark:text-rose-50">Receive Tokens</h3>
                <p className="text-red-800/60 dark:text-rose-100/60">
                  Get 1% of your donation amount in tokens automatically
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <History className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-950 dark:text-rose-50">Use Your Tokens</h3>
                <p className="text-red-800/60 dark:text-rose-100/60">
                  Participate in governance and earn rewards
                </p>
              </div>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 text-red-950 dark:text-rose-50">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-border last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="flex justify-between items-center w-full py-4 text-left"
                    aria-expanded={openFaqIndex === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50">
                      {faq.question}
                    </h3>
                    {openFaqIndex === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-red-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-red-600" />
                    )}
                  </button>
                  {openFaqIndex === faq.id && (
                    <div 
                      id={`faq-answer-${faq.id}`}
                      className="pb-4"
                    >
                      <p className="text-red-800/60 dark:text-rose-100/60">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 