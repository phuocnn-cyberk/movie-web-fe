import React from "react";
import { TextFade } from "@/components/ui/text-fade";

interface MilestonesHeaderProps {
  badgeText: string;
}

export const MilestonesHeader: React.FC<MilestonesHeaderProps> = ({
  badgeText,
}) => {
  return (
    <header className="self-center flex  max-w-full flex-col items-stretch font-normal">
      <TextFade direction="up">
        <div className="text-helix-blue dark:text-white  bg-neutral-100 dark:bg-[#F5F5F5]/10 gap-2 w-fit mx-auto text-sm px-4 py-2 rounded-full">
          {badgeText}
        </div>
        <h1 className="flex w-full text-helix-black dark:text-white items-center text-center gap-2 text-2xl md:text-5xl flex-wrap mt-[18px] max-md:max-w-full">
          Incubated with Asia&apos;s <br /> leading Fintech
        </h1>
      </TextFade>
    </header>
  );
};
