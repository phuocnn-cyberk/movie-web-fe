"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export const SupportHero: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-[50px]">
      <div className="flex flex-col gap-[14px]">
        <h1 className="font-[Manrope] text-[48px] leading-[1.5em] font-bold text-white">
          Welcome to our support page!
        </h1>
        <p className="font-[Manrope] text-[18px] leading-[1.5em] font-normal text-[#999999]">
          We&apos;re here to help you with any problems you may be having with our product.
        </p>
      </div>

      <div className="h-full w-full rounded-md border-[6px] border-[#262626] bg-[#0F0F0F] p-[50px]">
        <div className="flex flex-col gap-[20px]">
          <h2 className="mb-[10px] font-[Manrope] text-[24px] font-bold text-white">Contact Information</h2>

          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A]">
                <Phone className="h-6 w-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="font-[Manrope] text-[16px] font-semibold text-white">Phone</span>
                <span className="font-[Manrope] text-sm text-[#999999]">+84 906 888 888</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A]">
                <Mail className="h-6 w-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="font-[Manrope] text-[16px] font-semibold text-white">Email</span>
                <span className="font-[Manrope] text-sm text-[#999999]">thandongdatviet357@gmail.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A]">
                <MapPin className="h-6 w-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="font-[Manrope] text-[16px] font-semibold text-white">Address</span>
                <span className="font-[Manrope] text-sm text-[#999999]">123 StreamVibe St, Hanoi, Vietnam</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A]">
                <Clock className="h-6 w-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="font-[Manrope] text-[16px] font-semibold text-white">Business Hours</span>
                <span className="font-[Manrope] text-sm text-[#999999]">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
