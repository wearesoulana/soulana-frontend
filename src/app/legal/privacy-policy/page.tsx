import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy - Soulana",
  description: "Our commitment to protecting your privacy and personal information.",
};

export const dynamic = "force-static";
export const revalidate = false;

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl font-bold mb-8 text-red-950 dark:text-rose-50">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Contact information (name, email address)</li>
                <li>Account information</li>
                <li>Transaction data</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our services</li>
                <li>Process your donations</li>
                <li>Send you updates and notifications</li>
                <li>Improve our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service providers</li>
                <li>Partner organizations (with your consent)</li>
                <li>Legal authorities when required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>Email: privacy@Soulana.org</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 