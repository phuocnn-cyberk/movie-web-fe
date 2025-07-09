"use client";

import React from "react";
import { DevicesHeader } from "./devices-header";
import Image from "next/image";

// Device data
const devices = [
  {
    id: 1,
    title: "Smartphones",
    description: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/smartphone.svg",
  },
  {
    id: 2,
    title: "Tablet",
    description: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/tablet.svg",
  },
  {
    id: 3,
    title: "Smart TV",
    description: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/smarttv.svg",
  },
  {
    id: 4,
    title: "Laptops",
    description: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/laptop.svg",
  },
  {
    id: 5,
    title: "Gaming Consoles",
    description: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/gaming.svg",
  },
  {
    id: 6,
    title: "VR Headsets",
    description: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/vr.svg",
  },
];

interface DeviceCardProps {
  title: string;
  description: string;
  icon: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ title, description, icon }) => {
  return (
    <div 
      className="flex-1 bg-[#0F0F0F] border border-[#262626] rounded-xl p-[50px] flex flex-col gap-[30px] relative overflow-hidden"
      style={{
        background: `linear-gradient(335deg, #0F0F0F 0%, #0F0F0F 70%, rgba(229, 0, 0, 0.3) 100%)`,
      }}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className="bg-[#141414] border border-[#1F1F1F] rounded-xl p-4">
          <div className="w-10 h-10 relative">
            <Image 
              src={icon} 
              alt={title} 
              fill 
              className="object-contain"
            />
          </div>
        </div>
        <h3 className="text-white text-2xl font-semibold leading-[1.5em]">{title}</h3>
      </div>
      <p className="text-[#999999] text-lg font-normal leading-[1.5em] relative z-10">
        {description}
      </p>
    </div>
  );
};

export const DevicesSection: React.FC = () => {
  return (
    <section
      id="devices"
      className="w-full p-20 bg-[#0F0F0F]"
    >
      <div className="container mx-auto px-4">
        <DevicesHeader />
        
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col md:flex-row gap-[30px]">
            {devices.slice(0, 3).map((device) => (
              <DeviceCard
                key={device.id}
                title={device.title}
                description={device.description}
                icon={device.icon}
              />
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-[30px]">
            {devices.slice(3, 6).map((device) => (
              <DeviceCard
                key={device.id}
                title={device.title}
                description={device.description}
                icon={device.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
