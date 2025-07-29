"use client";

import React from "react";

export const SubscriptionHero: React.FC = () => {
  return (
    <section className="w-full mb-20">
      <div className="flex items-end gap-[100px] w-full">
        <div className="flex-1 flex flex-col gap-[14px]">
          <h1 className="text-[48px] font-bold text-white leading-[1.5em] font-[Manrope]">
            Choose the plan that&apos;s right for you
          </h1>
          <p className="text-[18px] font-normal text-[#999999] leading-[1.5em] font-[Manrope]">
            Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
          </p>
        </div>
      </div>
    </section>
  );
};
