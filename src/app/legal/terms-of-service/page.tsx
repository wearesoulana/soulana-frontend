import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service - Soulana",
  description: "Terms and conditions for using the Soulana platform.",
};

export const dynamic = "force-static";
export const revalidate = false;

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl font-bold mb-8 text-red-950 dark:text-rose-50">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Soulana&apos;s services, you agree to comply with and be bound by these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
              <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You are prohibited from:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Using the service for any illegal purpose</li>
                <li>Attempting to interfere with the service&apos;s operation</li>
                <li>Impersonating any person or entity</li>
                <li>Engaging in any fraudulent activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Responsibilities</h2>
              <p>When you create an account, you agree to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate information</li>
                <li>Maintain the security of your account</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Donations and Transactions</h2>
              <p>By making donations through our platform:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>You confirm that you are authorized to use the payment method</li>
                <li>You understand that transactions are final and non-refundable</li>
                <li>You acknowledge that we may share transaction details with relevant parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p>All content, features, and functionality of our service are owned by Soulana and protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p>Soulana shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p>For questions about these Terms, please contact us at:</p>
              <p>Email: legal@Soulana.org</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 