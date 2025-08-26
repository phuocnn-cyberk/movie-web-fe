import { TextFade } from "@/components/ui/text-fade";
import React from "react";

export const DevicesHeader: React.FC = () => {
  return (
    <header className="mb-14 flex max-w-full flex-col items-stretch self-center font-normal">
      <TextFade direction="up">
        <h1 className="text-helix-black mb-3.5 text-4xl leading-[1.5em] font-bold md:text-[38px] dark:text-white">
          We Provide you streaming experience across various devices.
        </h1>
      </TextFade>
      <TextFade direction="up">
        <p className="max-w-[calc(100%-300px)] text-lg leading-[1.5em] font-normal text-neutral-600 dark:text-[#999999]">
          With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed
          to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.
        </p>
      </TextFade>
    </header>
  );
};
