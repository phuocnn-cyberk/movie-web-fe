"use client";
import React, { useState } from "react";
import Image from "next/image";
import { WhyHeader } from "./why-header";
import WhyHelix from "@/public/images/why-helix.svg";
import { Border } from "@/components/ui/moving-border";
import { SocialsDialog } from "@/components/common/socials";

export const WhySection: React.FC = () => {
  const [isSocialsDialogOpen, setIsSocialsDialogOpen] = useState(false);
  return (
    <section className="py-8 items-center w-full  flex flex-col overflow-hidden pt-20  px-20  max-md:px-5">
      <div className="flex w-full px-6 md:px-17 pt-4 md:pt-12 pb-8 md:pb-16 bg-helix-black max-w-[1200px] rounded-2xl flex-col items-stretch relative overflow-hidden">
        {/* Background video */}
        <video
          className="absolute scale-218 w-full h-full object-cover z-0"
          src="/video/bg-vid.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-helix-black to-helix-blue-dark opacity-60 z-10 backdrop-blur-sm" />
        {/* Content overlay */}
        <div className="flex flex-col lg:flex-row z-10 relative">
          <div className="flex flex-col">
            <WhyHeader />
            <p className="max-lg:text-center pb-6 mt-8 space-y-3 text-sm md:text-lg text-white">
              The composability of DeFi from our USHD stablecoin
              <br />
              <br />
              The credibility and confidence of off-chain Real World Assets is
              coming to your wallet very soon.
            </p>
            <div className="w-[90%] max-md:mx-auto h-[1px] border-t border-dashed border-white/60"></div>
            <div className="border-x-2 border-accent w-fit max-lg:mx-auto text-white text-lg md:text-2xl mt-4 py-2 px-5 mb-4 bg-gradient-to-r from-[rgba(98,190,192,0.3)] via-[rgba(98,190,192,0.2)] to-transparent backdrop-blur-sm">
              <span className="bg-gradient-to-r from-[#BBFDFE] via-[#97E4E5] to-[#62BEC0] bg-clip-text text-transparent ">
                LOOK OUT FOR IT IN Q3 2025
              </span>
            </div>
            <div className="flex max-lg:justify-center">
              <SocialsDialog
                open={isSocialsDialogOpen}
                onOpenChange={setIsSocialsDialogOpen}
              >
                <button
                  className="cursor-pointer"
                  onClick={() => setIsSocialsDialogOpen(true)}
                >
                  <Border className="bg-helix-dark text-lg">
                    Join The Community
                  </Border>
                </button>
              </SocialsDialog>
            </div>
          </div>
          <Image
            className="max-md:mt-10 mx-auto"
            src={WhyHelix}
            width={540}
            alt="Why Helix"
          />
        </div>
      </div>
    </section>
  );
};
