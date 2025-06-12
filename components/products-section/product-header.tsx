import React from "react";
import { TextFade } from "../ui/text-fade";

interface ProductHeaderProps {
  badgeText: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ badgeText }) => {
  return (
    <header className="self-center flex  max-w-full flex-col items-stretch font-normal">
      <TextFade direction="up">
        <div className="text-helix-blue dark:text-white  bg-neutral-100 dark:bg-[#F5F5F5]/10 gap-2 w-fit mx-auto text-sm px-4 py-2 rounded-full">
          {badgeText}
        </div>
        <h1 className="flex w-full items-center justify-center gap-2 mx-auto text-5xl flex-wrap mt-[18px] max-md:max-w-full max-md:text-[24px]">
          <span className="my-auto dark:text-white text-helix-black">
            In-depth
          </span>
          <span className="my-auto text-accent">Product Offerings</span>
        </h1>
      </TextFade>
    </header>
  );
};
