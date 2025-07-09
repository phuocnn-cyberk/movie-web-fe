import React from "react";
import { TextFade } from "@/components/ui/text-fade";

interface PricingHeaderProps {
  title?: string;
  description?: string;
}

export const PricingHeader: React.FC<PricingHeaderProps> = ({
  title = "Choose the plan that's right for you",
  description = "Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!"
}) => {
  return (
    <header className="flex flex-col gap-3.5 flex-1">
      <TextFade direction="up">
        <h1 className="text-white font-bold text-4xl md:text-[38px] leading-[1.5em] text-left">
          {title}
        </h1>
        <p className="text-[#999999] font-normal text-lg leading-[1.5em] text-left">
          {description}
        </p>
      </TextFade>
    </header>
  );
}; 