import React from "react";
import { TextFade } from "@/components/ui/text-fade";

export const WhyHeader: React.FC = () => {
  return (
    <header className="flex  max-w-full flex-col items-stretch font-normal">
      <TextFade direction="up">
        <h1 className="flex max-lg:justify-center w-full items-center gap-2 text-2xl md:text-[40px] flex-wrap mt-[18px] max-md:max-w-full">
          <span className="text-white">
            The Composability of DeFi, <br />
            The Confidence of TradFi
          </span>
        </h1>
      </TextFade>
    </header>
  );
};
