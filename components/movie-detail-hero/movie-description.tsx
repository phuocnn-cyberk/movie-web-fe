"use client";

import React from "react";

interface MovieDescriptionProps {
  description: string;
}

export const MovieDescription: React.FC<MovieDescriptionProps> = ({ description }) => {
  return (
    <section className="w-full py-0 pb-10">
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-[50px]">
        <h2 className="text-[18px] font-medium text-[#999999] font-[Manrope] mb-[14px]">
          Description
        </h2>
        <p className="text-[18px] font-medium text-white leading-[1.5em] font-[Manrope]">
          {description}
        </p>
      </div>
    </section>
  );
}; 