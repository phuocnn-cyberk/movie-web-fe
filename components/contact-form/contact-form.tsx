"use client";

import { useSupport } from "@/hooks/support/useSupport";
import React, { useState } from "react";
import { Button } from "../ui/button";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    agree: false,
  });

  const supportMutation = useSupport();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Terms of Use and Privacy Policy");
      return;
    }

    supportMutation.mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
      {
        onSuccess: () => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: "",
            agree: false,
          });
        },
      }
    );
  };

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[50px] rounded-xl border border-[#262626] bg-[#0F0F0F] p-[50px]"
      >
        {/* First Row */}
        <div className="flex w-full gap-[50px]">
          <div className="flex flex-1 flex-col gap-4">
            <label className="font-[Manrope] text-[18px] font-semibold text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="rounded-lg border border-[#262626] bg-[#141414] p-5 font-[Manrope] text-[16px] text-white transition-colors focus:border-[#E50000] focus:outline-none"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <label className="font-[Manrope] text-[18px] font-semibold text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="rounded-lg border border-[#262626] bg-[#141414] p-5 font-[Manrope] text-[16px] text-white transition-colors focus:border-[#E50000] focus:outline-none"
              placeholder="Enter Last Name"
              required
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex w-full gap-[50px]">
          <div className="flex flex-1 flex-col gap-4">
            <label className="font-[Manrope] text-[18px] font-semibold text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="rounded-lg border border-[#262626] bg-[#141414] p-5 font-[Manrope] text-[16px] text-white transition-colors focus:border-[#E50000] focus:outline-none"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <label className="font-[Manrope] text-[18px] font-semibold text-white">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="rounded-lg border border-[#262626] bg-[#141414] p-5 font-[Manrope] text-[16px] text-white transition-colors focus:border-[#E50000] focus:outline-none"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex w-full flex-col gap-4">
          <label className="font-[Manrope] text-[18px] font-semibold text-white">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="resize-none rounded-lg border border-[#262626] bg-[#141414] p-5 font-[Manrope] text-[16px] text-white transition-colors focus:border-[#E50000] focus:outline-none"
            placeholder="Enter your Message"
            required
          />
        </div>

        {/* Agree + Submit */}
        <div className="flex w-full items-center justify-between gap-[70px]">
          <div className="flex flex-1 items-center gap-3">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              className="h-5 w-5 cursor-pointer rounded border-2 border-[#262626] bg-[#141414] text-[#E50000]"
              required
            />
            <label htmlFor="agree" className="font-[Manrope] text-[14px] leading-relaxed text-[#999999]">
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>

          <Button
            type="submit"
            disabled={supportMutation.isPending}
            className="cursor-pointer rounded-lg bg-[#E50000] px-6 py-[18px] font-[Manrope] text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[#CC0000] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {supportMutation.isPending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};
