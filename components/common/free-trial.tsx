"use client";

import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const FreeTrial = () => {
  const router = useRouter();

  return (
    <section className="w-full py-20 pt-0 dark:bg-[#0F0F0F]">
      <div className="relative mx-20 overflow-hidden rounded-lg border border-gray-500 px-4">
        <div className="absolute inset-0">
          <Image src="/images/free-trial-bg.png" alt="Free Trial Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 via-[#E50000]/60 to-[#E50000]/80"></div>
        </div>

        <div className="relative z-10 flex h-full min-h-[200px] items-center justify-between">
          <div className="ml-8 flex-1 text-left md:ml-16">
            <h2 className="mb-4 text-2xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
              Start your free trial today!
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-white/90 md:text-lg lg:max-w-2xl">
              Start your free trial today and enjoy unlimited access to our premium content.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="cursor-pointer rounded-lg bg-[#E50000] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#CC0000] hover:shadow-xl"
              onClick={() => router.push(ROUTES.moviesShows)}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
