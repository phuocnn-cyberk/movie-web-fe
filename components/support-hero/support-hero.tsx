"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const SupportHero: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-[50px]">
      {/* Text Container */}
      <div className="flex flex-col gap-[14px]">
        <h1 className="text-[48px] font-bold text-white leading-[1.5em] font-[Manrope]">
          Welcome to our support page!
        </h1>
        <p className="text-[18px] font-normal text-[#999999] leading-[1.5em] font-[Manrope]">
          We&apos;re here to help you with any problems you may be having with our product.
        </p>
      </div>

      {/* Contact Info Container */}
      <div className="bg-[#0F0F0F] border-[6px] border-[#262626] rounded-md p-[50px] w-full h-full">
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[24px] font-bold text-white font-[Manrope] mb-[10px]">
            Contact Information
          </h2>
          
          {/* Contact Items */}
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#262626] rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[16px] font-[Manrope]">Phone</span>
                <span className="text-[#999999] text-[14px] font-[Manrope]">+1-555-123-4567</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#262626] rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[16px] font-[Manrope]">Email</span>
                <span className="text-[#999999] text-[14px] font-[Manrope]">support@streamvibe.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#262626] rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[16px] font-[Manrope]">Address</span>
                <span className="text-[#999999] text-[14px] font-[Manrope]">123 StreamVibe St, Los Angeles, CA 90210</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#262626] rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#E50000]" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[16px] font-[Manrope]">Business Hours</span>
                <span className="text-[#999999] text-[14px] font-[Manrope]">Mon-Fri: 9:00 AM - 6:00 PM (PST)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 