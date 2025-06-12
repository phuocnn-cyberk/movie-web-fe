import React from "react";
import { TextFade } from "@/components/ui/text-fade";

interface RWAHeaderProps {
  badgeText: string;
}

export const RWAHeader: React.FC<RWAHeaderProps> = ({ badgeText }) => {
  return (
    <header className="self-center flex text-left max-w-full flex-col items-stretch font-normal">
      <TextFade direction="up">
        <div className="text-helix-blue dark:text-white w-fit bg-neutral-100 dark:bg-[#F5F5F5]/10 gap-2 text-sm px-4 py-2 rounded-[100px]">
          {badgeText}
        </div>

        <h1 className="flex  items-center gap-2 text-5xl flex-wrap mt-[18px] max-md:max-w-full max-md:text-2xl">
          <span className="self-stretch my-auto text-helix-black dark:text-white">
            Full-Stack Access to <br />{" "}
            <span className="text-accent">Real World Assets</span> (RWAs)
          </span>
        </h1>
      </TextFade>
    </header>
  );
};
