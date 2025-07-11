"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ComparisonFeature {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Price",
    basic: "$9.99/Month",
    standard: "$12.99/Month", 
    premium: "$14.99/Month"
  },
  {
    name: "Content",
    basic: "Access to a vast library of movies and shows, including recently released titles.",
    standard: "Access to same library as Basic, plus exclusive content and early access to new releases.",
    premium: "Access to same library as Standard, plus offline viewing and exclusive Premium content."
  },
  {
    name: "Devices",
    basic: "Watch on one device simultaneously",
    standard: "Watch on Two device simultaneously",
    premium: "Watch on Four device simultaneously"
  },
  {
    name: "Free Trial",
    basic: "7 Days",
    standard: "7 Days",
    premium: "7 Days"
  },
  {
    name: "Cancel Anytime",
    basic: true,
    standard: true,
    premium: true
  },
  {
    name: "HDR",
    basic: false,
    standard: true,
    premium: true
  },
  {
    name: "Dolby Atmos",
    basic: false,
    standard: true,
    premium: true
  },
  {
    name: "Ad - Free",
    basic: true,
    standard: true,
    premium: true
  },
  {
    name: "Offline Viewing",
    basic: false,
    standard: false,
    premium: true
  },
  {
    name: "Family Sharing",
    basic: false,
    standard: true,
    premium: true
  }
];

export const PlanComparison: React.FC = () => {
  const renderFeatureCell = (value: boolean | string, isPricing = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-6 h-6 text-white mx-auto" />
      ) : (
        <X className="w-6 h-6 text-[#999999] mx-auto" />
      );
    }
    
    return (
      <span className={`text-center block ${isPricing ? 'text-white font-semibold text-[18px]' : 'text-[#999999] text-[14px]'} font-[Manrope] leading-relaxed max-w-full`}>
        {value}
      </span>
    );
  };

  return (
    <section className="w-full py-20">
      {/* Header */}
      <div className="mb-20">
        <div className="flex flex-col gap-[14px] pr-[300px]">
          <h2 className="text-[48px] font-bold text-white leading-[1.5em] font-[Manrope]">
            Compare our plans and find the right one for you
          </h2>
          <p className="text-[18px] font-normal text-[#999999] leading-[1.5em] font-[Manrope]">
            StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that&apos;s right for you.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-[#262626] rounded-xl overflow-hidden overflow-x-auto">
        {/* Table Header */}
        <div className="bg-[#0F0F0F] border-b border-[#262626] grid grid-cols-4 min-w-[800px]">
          <div className="p-[30px] flex items-center justify-center min-w-[200px]">
            <span className="text-white font-semibold text-[18px] font-[Manrope]">Features</span>
          </div>
          <div className="p-[30px] border-l border-[#262626] flex items-center justify-center min-w-[200px]">
            <span className="text-white font-semibold text-[18px] font-[Manrope]">Basic</span>
          </div>
          <div className="p-[30px] border-l border-[#262626] flex items-center justify-center min-w-[200px]">
            <span className="text-white font-semibold text-[18px] font-[Manrope]">Standard</span>
          </div>
          <div className="p-[30px] border-l border-[#262626] flex items-center justify-center min-w-[200px]">
            <span className="text-white font-semibold text-[18px] font-[Manrope]">Premium</span>
          </div>
        </div>

        {/* Table Rows */}
        {comparisonFeatures.map((feature, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-4 min-w-[800px] ${index !== comparisonFeatures.length - 1 ? 'border-b border-[#262626]' : ''}`}
          >
            {/* Feature Name */}
            <div className="p-[30px] flex items-center min-w-[200px]">
              <span className="text-white font-medium text-[16px] font-[Manrope]">
                {feature.name}
              </span>
            </div>

            {/* Basic Plan */}
            <div className="p-[30px] border-l border-[#262626] flex items-center justify-center min-w-[200px]">
              {renderFeatureCell(feature.basic, feature.name === "Price")}
            </div>

            {/* Standard Plan */}
            <div className="p-[30px] border-l border-[#262626] flex items-center justify-center min-w-[200px]">
              {renderFeatureCell(feature.standard, feature.name === "Price")}
            </div>

            {/* Premium Plan */}
            <div className="p-[30px] border-l border-[#262626] flex items-center justify-center min-w-[200px]">
              {renderFeatureCell(feature.premium, feature.name === "Price")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 