import React from "react";
import { Button } from "../ui/button";

interface PricingPlanCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
}

export const PricingPlanCard: React.FC<PricingPlanCardProps> = ({ title, description, price, period = "/month" }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#262626] bg-[#1A1A1A] p-10">
      <div className="flex h-full flex-col gap-4">
        <h3 className="text-2xl leading-tight font-bold text-white">{title}</h3>
        <p className="text-lg leading-tight font-normal text-[#999999]">{description}</p>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-4xl leading-tight font-semibold text-white">{price}</span>
        <span className="text-lg leading-tight font-medium text-[#999999]">{period}</span>
      </div>

      <div className="mt-auto flex w-full flex-col gap-4">
        <Button className="rounded-lg border border-[#262626] bg-[#141414] p-6 font-semibold text-white hover:bg-black/80">
          Start Free Trial
        </Button>
        <Button className="rounded-lg bg-[#E50000] p-6 text-lg font-semibold text-white hover:bg-[#E50000]/80">
          Choose Plan
        </Button>
      </div>
    </div>
  );
};
