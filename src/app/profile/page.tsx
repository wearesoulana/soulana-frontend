"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/wallet-context";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  Wallet, 
  History, 
  Coins,
  ArrowUpRight,
  Gift,
  Award
} from "lucide-react";
import { UsernameManager } from "@/components/username-manager";

interface Donation {
  id: string;
  amount: number;
  signature: string;
  projectId: number;
  projectTitle: string;
  status: string;
  createdAt: string;
}

interface Token {
  id: string;
  amount: number;
  reason: string;
  createdAt: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'DONATION' | 'ROLE' | 'ACHIEVEMENT';
}

interface UserProfile {
  walletAddress: string;
  username: string | null;
  totalDonated: number;
  tokenBalance: number;
  donationHistory: Donation[];
  tokenHistory: Token[];
  badges: Badge[];
  role: 'USER' | 'ADMIN' | 'DEVELOPER' | 'TEAM_MEMBER';
}

export default function ProfilePage() {
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isConnected && walletAddress) {
        setLoading(true);
        try {
          const response = await fetch(`/api/profile?walletAddress=${walletAddress}`);
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [isConnected, walletAddress]);

  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center mt-16">
            <h1 className="text-4xl font-bold mb-6 text-red-950 dark:text-rose-50">
              Your Profile
            </h1>
            <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <p className="text-red-800/60 dark:text-rose-100/60 mb-6">
                Connect your wallet to view your profile and donation history
              </p>
              <Button
                onClick={connectWallet}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm mt-16">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
                <span className="ml-3 text-red-800/60 dark:text-rose-100/60">
                  Loading profile...
                </span>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto mt-16">
          <h1 className="text-4xl font-bold mb-6 text-red-950 dark:text-rose-50">
            Your Profile
          </h1>

          {/* Profile Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50">
                  Wallet
                </h3>
                <Wallet className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-sm text-red-800/60 dark:text-rose-100/60 break-all">
                {profile?.walletAddress}
              </p>
              <div className="mt-4 pt-4 border-t border-red-200/20">
                <h4 className="text-sm font-semibold text-red-950 dark:text-rose-50 mb-2">
                  Username
                </h4>
                {profile && (
                  <UsernameManager
                    walletAddress={profile.walletAddress}
                    currentUsername={profile.username}
                    onUsernameUpdate={(newUsername) => {
                      setProfile(prev => prev ? {
                        ...prev,
                        username: newUsername
                      } : null);
                    }}
                  />
                )}
              </div>
            </Card>

            <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50">
                  Total Donated
                </h3>
                <Gift className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-950 dark:text-rose-50">
                {profile?.totalDonated.toFixed(2)} SOL
              </p>
            </Card>

            <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-950 dark:text-rose-50">
                  Token Balance
                </h3>
                <Coins className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-950 dark:text-rose-50">
                {profile?.tokenBalance} CCT
              </p>
            </Card>
          </div>

          {/* Badges Section */}
          <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-950 dark:text-rose-50">
                Badges
              </h2>
              <Award className="h-5 w-5 text-red-600" />
            </div>

            {profile?.badges.length === 0 ? (
              <p className="text-center py-8 text-red-800/60 dark:text-rose-100/60">
                No badges earned yet. Start donating to earn badges!
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {profile?.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center p-4 rounded-lg bg-white/30 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                  >
                    <span className="text-4xl mb-2" role="img" aria-label={badge.name}>
                      {badge.icon}
                    </span>
                    <h3 className="font-medium text-red-950 dark:text-rose-50 text-center">
                      {badge.name}
                    </h3>
                    <p className="text-xs text-red-800/60 dark:text-rose-100/60 text-center mt-1">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Donation History */}
          <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-950 dark:text-rose-50">
                Donation History
              </h2>
              <History className="h-5 w-5 text-red-600" />
            </div>

            {profile?.donationHistory.length === 0 ? (
              <p className="text-center py-8 text-red-800/60 dark:text-rose-100/60">
                No donations yet. Start making a difference today!
              </p>
            ) : (
              <div className="space-y-4">
                {profile?.donationHistory.map((donation) => (
                  <div
                    key={donation.signature}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/30 dark:bg-black/30"
                  >
                    <div>
                      <h3 className="font-medium text-red-950 dark:text-rose-50">
                        {donation.projectTitle}
                      </h3>
                      <p className="text-sm text-red-800/60 dark:text-rose-100/60">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium text-red-950 dark:text-rose-50">
                        {donation.amount} SOL
                      </p>
                      <a
                        href={`https://explorer.solana.com/tx/${donation.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Token History */}
          <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-950 dark:text-rose-50">
                Token History
              </h2>
              <Coins className="h-5 w-5 text-red-600" />
            </div>

            {profile?.tokenHistory.length === 0 ? (
              <p className="text-center py-8 text-red-800/60 dark:text-rose-100/60">
                No tokens earned yet. Make a donation to start earning tokens!
              </p>
            ) : (
              <div className="space-y-4">
                {profile?.tokenHistory.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/30 dark:bg-black/30"
                  >
                    <div>
                      <h3 className="font-medium text-red-950 dark:text-rose-50">
                        {token.reason}
                      </h3>
                      <p className="text-sm text-red-800/60 dark:text-rose-100/60">
                        {new Date(token.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-medium text-red-950 dark:text-rose-50">
                      +{token.amount} CCT
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 