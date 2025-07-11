"use client";

import React, { useState } from "react";

export const SubscriptionHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="w-full mb-20">
      <div className="flex items-end gap-[100px] w-full">
        {/* Left Side - Text Content */}
        <div className="flex-1 flex flex-col gap-[14px]">
          <h1 className="text-[48px] font-bold text-white leading-[1.5em] font-[Manrope]">
            Choose the plan that&apos;s right for you
          </h1>
          <p className="text-[18px] font-normal text-[#999999] leading-[1.5em] font-[Manrope]">
            Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
          </p>
        </div>

        {/* Right Side - Tabs */}
        <div className="flex-shrink-0">
          <div className="bg-[#0F0F0F] border border-[#262626] rounded-[10px] p-[10px] flex">
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-6 py-[14px] rounded-[10px] font-[Manrope] font-medium text-[16px] transition-all ${
                activeTab === "monthly"
                  ? "bg-[#1F1F1F] text-white"
                  : "text-[#999999] hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("yearly")}
              className={`px-6 py-[14px] rounded-[10px] font-[Manrope] font-medium text-[16px] transition-all ${
                activeTab === "yearly"
                  ? "bg-[#1F1F1F] text-white"
                  : "text-[#999999] hover:text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 