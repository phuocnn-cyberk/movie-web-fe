"use client";

import { MonitorSmartphone, Tablet, Tv, Laptop, Gamepad2, Bot } from "lucide-react";

const devices = [
  {
    icon: <MonitorSmartphone size={36} className="text-red-600" />,
    title: "Smartphones",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <Tablet size={36} className="text-red-600" />,
    title: "Tablet",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <Tv size={36} className="text-red-600" />,
    title: "Smart TV",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <Laptop size={36} className="text-red-600" />,
    title: "Laptops",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <Gamepad2 size={36} className="text-red-600" />,
    title: "Gaming Consoles",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <Bot size={36} className="text-red-600" />,
    title: "VR Headsets",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
];

export const StreamingDevicesSection = () => {
  return (
    <section className="px-6 md:px-16 py-12 md:py-20 bg-black text-white">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          We Provide you streaming experience across various devices.
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere.
          Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {devices.map((device, index) => (
          <div
            key={index}
            className="bg-[#141414] hover:shadow-lg transition p-6 rounded-xl border border-neutral-800"
          >
            <div className="mb-4">{device.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{device.title}</h3>
            <p className="text-gray-400 text-sm">{device.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
