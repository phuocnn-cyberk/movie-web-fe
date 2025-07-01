"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import homeBg from "@/public/images/home-bg.png";

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center w-full bg-[#141414]">
      <div className="relative w-full h-[400px] md:h-[550px] lg:h-[699px] flex-shrink-0">
        <Image
          src={homeBg}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />

        </div>

      <div className="flex flex-col items-center gap-[20px] md:gap-[30px] lg:gap-[40px] px-4 md:px-8 lg:px-[150px] w-full -mt-[50px] md:-mt-[75px] lg:-mt-[100px] relative z-10">
        <div className="flex flex-col gap-[8px] md:gap-[10px] w-full max-w-4xl">
          <h1 className="text-white font-bold text-[28px] md:text-[36px] lg:text-[48px] leading-[1.3] md:leading-[1.4] lg:leading-[1.5] font-manrope text-center">
            The Best Streaming Experience
          </h1>
          
          <p className="text-[#999999] text-[12px] md:text-[13px] lg:text-[14px] leading-[1.4] md:leading-[1.45] lg:leading-[1.5] font-manrope text-center">
            StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.
          </p>
        </div>

        <Button 
          className="bg-[#E50000] hover:bg-[#E50000]/90 text-white px-4 py-3 md:px-5 md:py-[12px] lg:px-[24px] lg:py-[14px] rounded-lg text-[12px] md:text-[13px] lg:text-[14px] font-semibold font-manrope flex items-center gap-[3px] md:gap-[4px]"
          size="lg"
        >
          <div className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px] flex items-center justify-center">
            <PlayCircle className="w-[12px] h-[13px] md:w-[14px] md:h-[15px] lg:w-[15.29px] lg:h-[16.45px]" />
          </div>
          Start Watching Now
        </Button>
      </div>
    </section>
  );
};
