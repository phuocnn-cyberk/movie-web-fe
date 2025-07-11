"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="bg-[#0F0F0F] border border-[#262626] rounded-xl p-[50px] flex flex-col gap-[50px]">
        
        {/* First Row - First Name & Last Name */}
        <div className="flex gap-[50px] w-full">
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-white font-semibold text-[18px] font-[Manrope]">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="bg-[#141414] border border-[#262626] rounded-lg p-5 text-white font-[Manrope] text-[16px] focus:border-[#E50000] focus:outline-none transition-colors"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-white font-semibold text-[18px] font-[Manrope]">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="bg-[#141414] border border-[#262626] rounded-lg p-5 text-white font-[Manrope] text-[16px] focus:border-[#E50000] focus:outline-none transition-colors"
              placeholder="Enter Last Name"
              required
            />
          </div>
        </div>

        {/* Second Row - Email & Phone */}
        <div className="flex gap-[50px] w-full">
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-white font-semibold text-[18px] font-[Manrope]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-[#141414] border border-[#262626] rounded-lg p-5 text-white font-[Manrope] text-[16px] focus:border-[#E50000] focus:outline-none transition-colors"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-white font-semibold text-[18px] font-[Manrope]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-[#141414] border border-[#262626] rounded-lg p-5 text-white font-[Manrope] text-[16px] focus:border-[#E50000] focus:outline-none transition-colors"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-4 w-full">
          <label className="text-white font-semibold text-[18px] font-[Manrope]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="bg-[#141414] border border-[#262626] rounded-lg p-5 text-white font-[Manrope] text-[16px] focus:border-[#E50000] focus:outline-none transition-colors resize-none"
            placeholder="Enter your Message"
            required
          />
        </div>

        {/* Checkbox and Submit Button */}
        <div className="flex items-center justify-between gap-[70px] w-full">
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              className="w-5 h-5 bg-[#141414] border-2 border-[#262626] rounded text-[#E50000] focus:ring-[#E50000] focus:ring-2"
              required
            />
            <label htmlFor="agree" className="text-[#999999] text-[14px] font-[Manrope] leading-relaxed">
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>
          
          <Button 
            type="submit"
            className="bg-[#E50000] hover:bg-[#CC0000] text-white font-semibold px-6 py-[18px] text-[16px] rounded-lg transition-all duration-300 font-[Manrope]"
          >
            Send Message
          </Button>
        </div>

      </form>
    </div>
  );
}; 