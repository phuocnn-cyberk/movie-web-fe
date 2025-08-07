"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import homeBg from "@/public/images/home-bg.png";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="flex w-full flex-col items-center bg-[#141414]">
      <div className="relative h-[400px] w-full flex-shrink-0 md:h-[550px] lg:h-[699px]">
        <Image src={homeBg} alt="Hero Background" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 -mt-[50px] flex w-full flex-col items-center gap-[20px] px-4 md:-mt-[75px] md:gap-[30px] md:px-8 lg:-mt-[100px] lg:gap-[40px] lg:px-[150px]">
        <div className="flex w-full max-w-4xl flex-col gap-[8px] md:gap-[10px]">
          <h1 className="font-manrope text-center text-[28px] leading-[1.3] font-bold text-white md:text-[36px] md:leading-[1.4] lg:text-[48px] lg:leading-[1.5]">
            The Best Streaming Experience
          </h1>

          <p className="font-manrope text-center text-[12px] leading-[1.4] text-[#999999] md:text-[13px] md:leading-[1.45] lg:text-[14px] lg:leading-[1.5]">
            StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime,
            anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters,
            classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find
            the content you want to watch.
          </p>
        </div>

        <Button
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#E50000] px-4 py-3 text-sm font-semibold text-white hover:bg-[#E50000]/90 md:gap-[4px] md:px-5 md:py-[12px] md:text-[13px] lg:px-[24px] lg:py-[14px] lg:text-[14px]"
          size="lg"
          onClick={() => {
            router.push(ROUTES.moviesShows);
          }}
        >
          <div className="flex h-[20px] w-[20px] items-center justify-center md:h-[22px] md:w-[22px] lg:h-[24px] lg:w-[24px]">
            <PlayCircle className="h-[13px] w-[12px] md:h-[15px] md:w-[14px] lg:h-[16.45px] lg:w-[15.29px]" />
          </div>
          Start Watching Now
        </Button>
      </div>
    </section>
  );
};
