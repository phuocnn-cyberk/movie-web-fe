"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ComparisonFeature {
  name: string;
  free: boolean | string;
  premium: boolean | string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Price",
    free: "Free",
    premium: "7.99$ / 30 days"
  },
  {
    name: "Watch public movies",
    free: true,
    premium: true
  },
  {
    name: "Watch Premium movies",
    free: false,
    premium: true
  },
  {
    name: "No Ads",
    free: false,
    premium: true
  },
  {
    name: "HD Quality",
    free: false,
    premium: true
  },
  {
    name: "Watch on multiple devices",
    free: false,
    premium: true
  },
  {
    name: "Download for offline viewing",
    free: false,
    premium: false // not supported yet
  }
];

export const PlanComparison: React.FC = () => {
  const renderFeatureCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-6 h-6 text-white mx-auto" />
      ) : (
        <X className="w-6 h-6 text-[#999999] mx-auto" />
      );
    }

    return (
      <span className="text-center block text-white font-[Manrope] text-[14px]">
        {value}
      </span>
    );
  };

  return (
    <section className="w-full py-20">
      <div className="mb-20">
        <h2 className="text-[48px] font-bold text-white font-[Manrope] mb-4">
          Compare Subscription Plans
        </h2>
        <p className="text-[18px] text-[#999999] font-[Manrope]">
          Below is a comparison between the Free and Premium plans.
        </p>
      </div>

      <div className="border border-[#262626] rounded-xl overflow-x-auto min-w-[600px]">
        <div className="grid grid-cols-3 bg-[#0F0F0F] border-b border-[#262626]">
          <div className="p-6 text-white font-semibold text-[18px] text-center">Feature</div>
          <div className="p-6 text-white font-semibold text-[18px] text-center border-l border-[#262626]">Free</div>
          <div className="p-6 text-white font-semibold text-[18px] text-center border-l border-[#262626]">Premium</div>
        </div>

        {comparisonFeatures.map((feature, i) => (
          <div key={i} className="grid grid-cols-3 border-b border-[#262626]">
            <div className="p-6 text-white text-[16px] font-[Manrope]">{feature.name}</div>
            <div className="p-6 border-l border-[#262626]">{renderFeatureCell(feature.free)}</div>
            <div className="p-6 border-l border-[#262626]">{renderFeatureCell(feature.premium)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
