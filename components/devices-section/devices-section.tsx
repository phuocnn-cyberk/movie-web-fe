"use client";

import Image from "next/image";
import React from "react";
import { DevicesHeader } from "./devices-header";

// Device data
const devices = [
  {
    id: 1,
    title: "Smartphones",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/smartphone.svg",
  },
  {
    id: 2,
    title: "Tablet",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/tablet.svg",
  },
  {
    id: 3,
    title: "Smart TV",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/smarttv.svg",
  },
  {
    id: 4,
    title: "Laptops",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/laptop.svg",
  },
  {
    id: 5,
    title: "Gaming Consoles",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: "/images/devices/gaming.svg",
  },
  {
    id: 6,
    title: "VR Headsets",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
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
      className="relative flex flex-1 flex-col gap-[30px] overflow-hidden rounded-xl border border-[#262626] bg-[#0F0F0F] p-[50px]"
      style={{
        background: `linear-gradient(335deg, #0F0F0F 0%, #0F0F0F 70%, rgba(229, 0, 0, 0.3) 100%)`,
      }}
    >
      <div className="relative z-10 flex items-center gap-4">
        <div className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-4">
          <div className="relative h-10 w-10">
            <Image src={icon} alt={title} fill className="object-contain" />
          </div>
        </div>
        <h3 className="text-2xl leading-[1.5em] font-semibold text-white">{title}</h3>
      </div>
      <p className="relative z-10 text-lg leading-[1.5em] font-normal text-[#999999]">{description}</p>
    </div>
  );
};

export const DevicesSection: React.FC = () => {
  return (
    <section id="devices" className="w-full bg-[#0F0F0F] p-20">
      <DevicesHeader />

      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px] md:flex-row">
          {devices.slice(0, 3).map((device) => (
            <DeviceCard key={device.id} title={device.title} description={device.description} icon={device.icon} />
          ))}
        </div>

        <div className="flex flex-col gap-[30px] md:flex-row">
          {devices.slice(3, 6).map((device) => (
            <DeviceCard key={device.id} title={device.title} description={device.description} icon={device.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};
