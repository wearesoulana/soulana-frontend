import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Accessibility - Soulana",
  description: "Our commitment to making Soulana accessible to everyone.",
};

export const dynamic = "force-static";
export const revalidate = false;

export default function AccessibilityPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl font-bold mb-8 text-red-950 dark:text-rose-50">Accessibility Statement</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p>
                Soulana is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
              <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible for people with disabilities.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
              <p>Our website includes the following accessibility features:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Keyboard navigation support</li>
                <li>ARIA landmarks and labels</li>
                <li>Alt text for images</li>
                <li>Proper heading structure</li>
                <li>Sufficient color contrast</li>
                <li>Resizable text</li>
                <li>Screen reader compatibility</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Assistive Technologies</h2>
              <p>Our website is designed to be compatible with the following assistive technologies:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Screen readers</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Known Issues</h2>
              <p>
                While we strive for WCAG 2.1 Level AA compliance, there may be some areas that need improvement. 
                We are actively working to identify and resolve any accessibility issues.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of Soulana. Please let us know if you 
                encounter accessibility barriers:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Email: accessibility@Soulana.org</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Assessment Methods</h2>
              <p>We assess the accessibility of Soulana through the following methods:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>External accessibility audits</li>
                <li>Automated testing tools</li>
                <li>User testing with assistive technologies</li>
                <li>Regular manual testing</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 