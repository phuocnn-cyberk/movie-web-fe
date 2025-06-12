"use client";

import React, { useState } from "react";
import { LettersPullUp } from "@/components/ui/text-pull-up";
import { TextFade } from "@/components/ui/text-fade";
import { SocialsDialog } from "@/components/common/socials";

export const HeroSection: React.FC = () => {
  const [isSocialsDialogOpen, setIsSocialsDialogOpen] = useState(false);
  return (
    <section
      id="home"
      className="relative flex items-center justify-center w-full min-h-[calc(100vh-68px)] overflow-hidden px-4 py-32"
    >
      {/* Background Video */}
      <video
        className="absolute  w-full h-full object-cover z-0"
        src="/video/hero-bg.webm"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-helix-black to-helix-blue-dark opacity-60 z-10 backdrop-blur-sm" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center translate-y-[-10vh] text-center w-full max-w-3xl mx-auto">
        <div className="mb-6 leading-[1.2]">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <LettersPullUp
              text="The"
              className="text-white text-[32px] md:text-[64px] leading-[1.2] font-normal"
            />
            <LettersPullUp
              text="Stablecoin"
              className="text-accent text-[32px] md:text-[64px] leading-[1.2] font-normal"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <LettersPullUp
              text="For a"
              className="text-white text-[32px] md:text-[64px] leading-[1.2] font-normal"
            />
            <LettersPullUp
              text="Stable Future"
              className="text-accent text-[32px] md:text-[64px] leading-[1.2] font-normal"
            />
          </div>
        </div>

        <TextFade direction="up">
          <div className="mb-8">
            <p className="text-white text-base md:text-xl font-normal">
              HELIX&apos;s USHD combines the composability of DeFi
              <br className="hidden md:block" />
              with the confidence of TradFi
            </p>
          </div>
        </TextFade>

        <TextFade direction="up">
          <SocialsDialog
            open={isSocialsDialogOpen}
            onOpenChange={setIsSocialsDialogOpen}
          >
            <button
              className=" bg-accent text-base md:text-lg hover:bg-accent/90 text-white  py-1 md:py-2 px-4 rounded-full transition-colors duration-200"
              onClick={() => setIsSocialsDialogOpen(true)}
            >
              Start Exploring
            </button>
          </SocialsDialog>
        </TextFade>
      </div>
    </section>
  );
};
