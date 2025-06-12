import React from "react";
import { TextFade } from "@/components/ui/text-fade";

interface SpotlightHeaderProps {
  badgeText: string;
  titleText: string;
}

export const SpotlightHeader: React.FC<SpotlightHeaderProps> = ({
  badgeText,
  titleText,
}) => {
  return (
    <header className="self-center flex w-full md:w-[1230px] text-left max-w-full flex-col items-stretch font-normal">
      <TextFade direction="up">
        <div className="text-helix-blue dark:text-white  bg-neutral-100 dark:bg-[#F5F5F5]/10 gap-2 w-fit  text-sm px-4 py-2 rounded-full">
          {badgeText}
        </div>
        <h1 className="flex w-full items-center gap-2 text-5xl flex-wrap mt-[18px] max-md:max-w-full max-md:text-2xl text-helix-black dark:text-white">
          {titleText}
        </h1>
      </TextFade>
    </header>
  );
};
