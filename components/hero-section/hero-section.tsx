"use client";

  import React from "react";
import { LettersPullUp } from "@/components/ui/text-pull-up";
import Image from "next/image";
import homeBg from "@/public/images/home-bg.png";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center w-full  overflow-hidden px-4 py-[300px]"
    >
      {/* Background Video */}
      {/* <video
        className="absolute  w-full h-full object-cover z-0"
        src="/video/hero-bg.webm"
        autoPlay
        loop
        muted
        playsInline
      /> */}
      <Image src={homeBg} alt="Hero Background" fill className="object-cover" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <LettersPullUp
            text="The Best Streaming Experience"
            className="text-white text-2xl md:text-[64px] font-normal"
          />
        </div>

        <p className="text-white text-base md:text-xl font-normal">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere. With StreamVibe, you
          can enjoy a wide variety of content, including the latest blockbusters,
          classic movies, popular TV shows, and more. You can also create your
          own watchlists, so you can easily find the content you want to watch.
        </p>
      </div>
    </section>
  );
};
