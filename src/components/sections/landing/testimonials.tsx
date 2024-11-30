"use client";

import React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Nonprofit Director",
    image: "https://placehold.co/100x100",
    content: "The Solana-powered donation platform has revolutionized how we receive support. Instant transactions and minimal fees mean more resources go directly to our cause.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Donor",
    image: "https://placehold.co/100x100",
    content: "I love how transparent and fast the donation process is. Being able to track my contributions on the blockchain gives me complete confidence in where my money goes.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Charity Organizer",
    image: "https://placehold.co/100x100",
    content: "The platform's user-friendly interface combined with Solana's speed has made fundraising so much more efficient. Our donors appreciate the seamless experience.",
    rating: 5
  }
];

export const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const testimonialElement = testimonialsRef.current;
    
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cards = Array.from(entry.target.querySelectorAll('.testimonial-card'));
          for (const [index, card] of cards.entries()) {
            setTimeout(() => {
              card.classList.add('animate-fade-in-up');
            }, index * 200);
          }
          observer.unobserve(entry.target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
    });

    if (testimonialElement) {
      observer.observe(testimonialElement);
    }

    return () => {
      if (testimonialElement) {
        observer.unobserve(testimonialElement);
      }
    };
  }, []);

  return (
    <section className="mt-12" ref={testimonialsRef}>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50">
          What People Say
        </h2>
        <p className="mt-4 text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl mx-auto">
          Hear from our community of donors and organizations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="testimonial-card p-6 bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-red-950 dark:text-rose-50">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-red-800/80 dark:text-rose-100/80">
                  {testimonial.role}
                </p>
              </div>
            </div>
            
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }, (_, index) => (
                <Star
                  key={`star-${index}-${testimonial.rating}`}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="text-red-800/80 dark:text-rose-100/80">
              {testimonial.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}; 