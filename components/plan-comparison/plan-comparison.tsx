"use client";

import { Check, X } from "lucide-react";
import React from "react";

interface ComparisonFeature {
  name: string;
  free: boolean | string;
  premium: boolean | string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Price",
    free: "Free",
    premium: "20$ / month",
  },
  {
    name: "Watch public movies",
    free: true,
    premium: true,
  },
  {
    name: "Watch Premium movies",
    free: false,
    premium: true,
  },
  {
    name: "No Ads",
    free: false,
    premium: true,
  },
  {
    name: "HD Quality",
    free: false,
    premium: true,
  },
];

export const PlanComparison: React.FC = () => {
  const renderFeatureCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="mx-auto h-6 w-6 text-white" />
      ) : (
        <X className="mx-auto h-6 w-6 text-[#999999]" />
      );
    }

    return <span className="block text-center font-[Manrope] text-[14px] text-white">{value}</span>;
  };

  return (
    <section className="w-full py-20">
      <div className="mb-20">
        <h2 className="mb-4 font-[Manrope] text-[48px] font-bold text-white">Compare Subscription Plans</h2>
        <p className="font-[Manrope] text-[18px] text-[#999999]">
          Below is a comparison between the Free and Premium plans.
        </p>
      </div>

      <div className="min-w-[600px] overflow-x-auto rounded-xl border border-[#262626]">
        <div className="grid grid-cols-3 border-b border-[#262626] bg-[#0F0F0F]">
          <div className="p-6 text-center text-[18px] font-semibold text-white">Feature</div>
          <div className="border-l border-[#262626] p-6 text-center text-[18px] font-semibold text-white">Free</div>
          <div className="border-l border-[#262626] p-6 text-center text-[18px] font-semibold text-white">Premium</div>
        </div>

        {comparisonFeatures.map((feature, i) => (
          <div key={i} className="grid grid-cols-3 border-b border-[#262626]">
            <div className="p-6 font-[Manrope] text-[16px] text-white">{feature.name}</div>
            <div className="border-l border-[#262626] p-6">{renderFeatureCell(feature.free)}</div>
            <div className="border-l border-[#262626] p-6">{renderFeatureCell(feature.premium)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
