"use client";

import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { TextFade } from "@/components/ui/text-fade";
export const ConfidenceSection: React.FC = () => {
  return (
    <section className="pt-34 px-4  mx-auto relative pb-20">
      <div className="hidden dark:block absolute w-full h-full left-0 top-0 pointer-events-none isolate">
        <div className="absolute  left-1/2 -translate-x-1/2 translate-y-[150px]  w-[80%] rounded-full h-[60%] bg-accent/30 blur-[100px] opacity-40"></div>
      </div>
      <div className="w-full max-w-[900px] mx-auto flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center z-5">
          <TextFade direction="up">
            <div className="text-helix-blue dark:text-white w-fit mx-auto self-center bg-neutral-100 dark:bg-[#F5F5F5]/10 gap-2 text-sm px-3 py-2 rounded-full">
              Why Helix?
            </div>
            <h1 className="mt-4 text-2xl md:text-5xl w-fit mx-auto px-6 md:px-12 text-helix-black  dark:text-white border border-helix-blue-dark dark:border-gray-600 rounded-full leading-tight py-3">
              Composability of <span className="text-accent">DeFi</span>,<br />
              Confidence of <span className="text-accent">TradFi</span>
            </h1>
          </TextFade>
        </div>
        <div className="h-10 w-px bg-helix-blue-dark mx-auto"></div>
        {/* Main Content Card */}
        <div className="relative">
          {/* Background layer 1 - helix-teal-dark */}
          <div className="absolute inset-0 bg-helix-teal-dark rounded-3xl transform -skew-x-1 md:-skew-x-2 z-1 translate-x-1 md:translate-x-3 border-1 border-helix-blue-dark translate-y-7"></div>

          {/* Background layer 2 - helix-cyan-light */}
          <div className="absolute inset-0 bg-helix-cyan-light rounded-3xl transform -skew-x-1 md:-skew-x-3 z-2 translate-x-0.5 md:translate-x-[6px] border-1 border-helix-blue-dark translate-y-4"></div>
          <div className="bg-helix-navy border-1 border-helix-blue-dark rounded-3xl p-8 md:p-12 text-white transform -skew-x-1 md:-skew-x-4 relative z-10">
            {/* Top text */}
            <p className="text-sm md:text-base leading-relaxed  text-center mx-auto w-[90%] text-gray-200 transform skew-x-4">
              Today, the world of Traditional Finance (TradFi) and Decentralized
              Finance (DeFi) are separated by a great divide. TradFi
              participants can&apos;t access the composability, programmability,
              or liquidity of DeFi. DeFi stakeholders can&apos;t access the
              security, certainty, and variety of real world assets (RWAs) in
              TradFi markets.
            </p>

            {/* Bridge statement */}
            <div className="text-center py-6">
              <div className="transform skew-x-4 flex flex-row items-center justify-between gap-3 md:gap-10">
                <div
                  className=" left-0 h-px w-full max-w-40 md:max-w-50"
                  style={{
                    background:
                      "linear-gradient(270deg, rgba(255, 255, 255, 0.3) 0%, rgba(153, 153, 153, 0) 100%)",
                  }}
                ></div>
                <h3 className="text-base min-w-fit md:text-[20px] text-white">
                  HELIX bridges that divide.
                </h3>
                <div
                  className=" right-0 h-px w-full max-w-40 md:max-w-50"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(153, 153, 153, 0) 100%)",
                  }}
                ></div>
              </div>
            </div>

            {/* Bottom text */}
            <p className="text-sm md:text-base leading-relaxed text-center mx-auto w-[90%] text-gray-200 transform skew-x-4">
              It starts with an institutional-grade stable coin solution, that
              provides access to RWAs for DeFi stakeholders, and unlocks
              secondary liquidity for TradFi participants. The stablecoin stays
              on-chain, while the assets are locked securely off-chain,
              providing a holistic solution that leverages the security of
              TradFi real world assets, with the composability of DeFi
              applications.
            </p>
          </div>
          {/* Decorative gradient border effect */}
        </div>
        {/* Bottom tagline */}
        <div className="text-center mt-18 z-1">
          <p className="text-base md:text-2xl text-helix-black dark:text-white">
            HELIX gives the people what they want <br />- access and
            accountability.
          </p>
        </div>
      </div>
      <BackgroundBeams />
    </section>
  );
};

export default ConfidenceSection;
