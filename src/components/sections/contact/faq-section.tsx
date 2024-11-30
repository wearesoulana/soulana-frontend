import React from "react";

const faqs = [
  {
    id: 1,
    question: "How can I track my donation?",
    answer: "All donations are tracked on the Solana blockchain. Once your donation is made, you'll receive a transaction ID that you can use to monitor its status and final destination."
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept various cryptocurrencies on the Solana blockchain. You can also make donations using traditional payment methods which will be converted to crypto automatically."
  },
  {
    id: 3,
    question: "How secure are my transactions?",
    answer: "All transactions are secured by Solana's blockchain technology, utilizing military-grade encryption and decentralized verification systems."
  },
  {
    id: 4,
    question: "Can I get a tax receipt for my donation?",
    answer: "Yes, we provide official tax receipts for all donations. These are automatically generated and sent to your registered email address."
  }
];

export const FAQSection = () => {
  return (
    <section>
      <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div 
            key={faq.id}
            className="bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-lg font-bold text-red-950 dark:text-rose-50 mb-3">
              {faq.question}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80 text-sm">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}; 