import React from "react";
import { TextFade } from "@/components/ui/text-fade";


export const DevicesHeader: React.FC = () => {
  return (
    <header className="self-center flex max-w-full flex-col items-stretch font-normal mb-14">
      <TextFade direction="up">
        <h1 className="text-helix-black dark:text-white text-4xl md:text-[38px] font-bold leading-[1.5em] mb-3.5">
          We Provide you streaming experience across various devices.
        </h1>
        <p className="text-neutral-600 dark:text-[#999999] text-lg font-normal leading-[1.5em] max-w-[calc(100%-300px)]">
          With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. 
          Our platform is designed to be compatible with a wide range of devices, ensuring 
          that you never miss a moment of entertainment.
        </p>
      </TextFade>
    </header>
  );
};
