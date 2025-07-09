"use client";

import React, { useState } from "react";
import { PricingHeader } from "./pricing-header";
import { PricingPlanCard } from "./pricing-plan-card";

// Define types for pricing plans
interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  period?: string;
}

// Pricing plans data
const pricingPlans: Record<"monthly" | "yearly", PricingPlan[]> = {
  monthly: [
    {
      id: "basic-monthly",
      title: "Basic Plan",
      description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      price: "$9.99"
    },
    {
      id: "standard-monthly",
      title: "Standard Plan",
      description: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      price: "$12.99"
    },
    {
      id: "premium-monthly",
      title: "Premium Plan",
      description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      price: "$14.99"
    }
  ],
  yearly: [
    {
      id: "basic-yearly",
      title: "Basic Plan",
      description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      price: "$99.99",
      period: "/year"
    },
    {
      id: "standard-yearly",
      title: "Standard Plan",
      description: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      price: "$129.99",
      period: "/year"
    },
    {
      id: "premium-yearly",
      title: "Premium Plan",
      description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      price: "$149.99",
      period: "/year"
    }
  ]
};

export const PricingSection: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section
      id="pricing"
      className="w-full p-20 dark:bg-[#0F0F0F]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-25 mb-20">
          {/* Header */}
          <PricingHeader />
          
          {/* Billing toggle */}
          <div className="bg-[#0F0F0F] border border-[#262626] rounded-[10px] p-[10px] flex">
            <button 
              className={`py-3.5 px-6 rounded-[10px] text-lg font-medium ${billingPeriod === "monthly" ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button 
              className={`py-3.5 px-6 rounded-[10px] text-lg font-medium ${billingPeriod === "yearly" ? "bg-[#1F1F1F] text-white" : "text-[#999999]"}`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="flex flex-col md:flex-row gap-[30px]">
          {pricingPlans[billingPeriod].map((plan) => (
            <PricingPlanCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              period={plan.period}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 