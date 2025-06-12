import React from "react";
import { TextFade } from "../ui/text-fade";

interface FAQHeaderProps {
  badgeText: string;
  titleText: string;
  titleText2: string;
}

export const FAQHeader: React.FC<FAQHeaderProps> = ({
  badgeText,
  titleText,
  titleText2,
}) => {
  return (
    <header className="flex flex-col items-center text-center">
      <TextFade direction="up">
        <div className="text-helix-blue dark:text-white bg-neutral-100 dark:bg-[#F5F5F5]/10 gap-2 text-sm px-4 py-2 mt-[44px] rounded-[100px] mb-[18px] inline-block">
          {badgeText}
        </div>
        <h1 className="text-5xl text-helix-black dark:text-white mb-2 max-md:text-2xl leading-tight">
          {titleText}
        </h1>
        <p className="text-base mx-6 leading-tight text-helix-black dark:text-gray-300 mb-9">
          {titleText2}
        </p>
      </TextFade>
    </header>
  );
};
