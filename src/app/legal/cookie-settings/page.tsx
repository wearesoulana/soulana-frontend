"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CookieSettingsPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handlePreferenceChange = (category: keyof typeof cookiePreferences) => {
    const newPreferences = {
      ...cookiePreferences,
      [category]: category === "necessary" ? true : !cookiePreferences[category],
    };
    setCookiePreferences(newPreferences);
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/50 dark:from-red-950 dark:via-black dark:to-red-950/50">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl font-bold mb-8 text-red-950 dark:text-rose-50">Cookie Settings</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              Please select your cookie preferences below.
            </p>

            <div className="space-y-8">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Necessary Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    These cookies are required for basic site functionality and cannot be disabled.
                  </p>
                </div>
                <Switch
                  checked={cookiePreferences.necessary}
                  disabled
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Help us improve our website by collecting and reporting usage information.
                  </p>
                </div>
                <Switch
                  checked={cookiePreferences.analytics}
                  onCheckedChange={() => handlePreferenceChange("analytics")}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
                <Switch
                  checked={cookiePreferences.marketing}
                  onCheckedChange={() => handlePreferenceChange("marketing")}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              {/* Preference Cookies */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Preference Cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Allow the website to remember choices you make and provide enhanced functionality.
                  </p>
                </div>
                <Switch
                  checked={cookiePreferences.preferences}
                  onCheckedChange={() => handlePreferenceChange("preferences")}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
              <p className="mb-4">
                For more information about how we use cookies and your personal data, please see our{" "}
                <a href="/legal/privacy-policy" className="text-red-600 dark:text-red-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                If you have any questions about our cookie usage, please contact us at{" "}
                <a href="mailto:privacy@soulana.org" className="text-red-600 dark:text-red-400 hover:underline">
                  privacy@soulana.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 