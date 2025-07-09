import React from "react";

interface PricingPlanCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
}

export const PricingPlanCard: React.FC<PricingPlanCardProps> = ({
  title,
  description,
  price,
  period = "/month"
}) => {
  return (
    <div className="flex-1 bg-[#1A1A1A] border border-[#262626] rounded-xl p-[50px] flex flex-col gap-[50px]">
      {/* Title and description */}
      <div className="flex flex-col gap-4">
        <h3 className="text-white text-2xl font-bold leading-[1.5em]">{title}</h3>
        <p className="text-[#999999] text-lg font-normal leading-[1.5em]">
          {description}
        </p>
      </div>
      
      {/* Price */}
      <div className="flex items-end justify-center gap-1">
        <span className="text-white text-4xl font-semibold leading-[0.73em]">{price}</span>
        <span className="text-[#999999] text-lg font-medium leading-[0.73em]">{period}</span>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <button className="flex-1 bg-[#141414] border border-[#262626] text-white font-semibold text-lg py-[18px] px-6 rounded-lg">
          Start Free Trial
        </button>
        <button className="flex-1 bg-[#E50000] text-white font-semibold text-lg py-[18px] px-6 rounded-lg">
          Choose Plan
        </button>
      </div>
    </div>
  );
}; 