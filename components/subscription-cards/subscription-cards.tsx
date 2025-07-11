"use client";

import React from "react";
import { Button } from "../ui/button";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
    price: 9.99,
    period: "month",
    features: [
      "Access to a vast library of movies and TV shows",
      "Ad-free streaming experience",
      "Watch on one device at a time",
      "Standard video quality"
    ]
  },
  {
    id: "standard",
    name: "Standard Plan", 
    description: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
    price: 12.99,
    period: "month",
    features: [
      "Access to a vast library of movies and TV shows",
      "Ad-free streaming experience", 
      "Watch on two devices simultaneously",
      "High-definition (HD) video quality"
    ],
    isPopular: true
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
    price: 14.99,
    period: "month",
    features: [
      "Access to a vast library of movies and TV shows",
      "Ad-free streaming experience",
      "Watch on multiple devices simultaneously", 
      "Ultra-high-definition (4K) video quality",
      "Offline viewing on mobile devices"
    ]
  }
];

export const SubscriptionCards: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex gap-[30px] w-full">
        {subscriptionPlans.map((plan) => (
          <div 
            key={plan.id}
            className="flex-1 bg-[#1A1A1A] border border-[#262626] rounded-xl p-[50px] flex flex-col gap-[50px] relative"
          >
            {/* Text Container */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[24px] font-bold text-white font-[Manrope]">
                {plan.name}
              </h3>
              <p className="text-[16px] text-[#999999] leading-relaxed font-[Manrope]">
                {plan.description}
              </p>
            </div>

            {/* Price Container */}
            <div className="flex justify-center items-end gap-1">
              <span className="text-[48px] font-bold text-white font-[Manrope]">
                ${plan.price}
              </span>
              <span className="text-[20px] text-[#999999] font-[Manrope] mb-2">
                /{plan.period}
              </span>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E50000] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[14px] text-[#999999] leading-relaxed font-[Manrope]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons Container */}
            <div className="flex gap-5 w-full">
              <Button 
                variant="outline"
                className="flex-1 bg-transparent border-[#262626] text-white hover:border-[#3A3A3A] hover:bg-[#262626] py-4 text-[16px] font-semibold font-[Manrope]"
              >
                Start Free Trial
              </Button>
              <Button 
                className={`flex-1 py-4 text-[16px] font-semibold font-[Manrope] ${
                  plan.isPopular 
                    ? "bg-[#E50000] hover:bg-[#CC0000] text-white" 
                    : "bg-[#262626] hover:bg-[#3A3A3A] text-white"
                }`}
              >
                Choose Plan
              </Button>
            </div>

            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#E50000] text-white px-4 py-2 rounded-lg text-[14px] font-semibold font-[Manrope]">
                  Most Popular
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}; 