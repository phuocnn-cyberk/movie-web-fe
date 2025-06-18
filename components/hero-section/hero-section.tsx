"use client";

import React, { useState } from "react";
import { SocialsDialog } from "@/components/common/socials";

export const HeroSection: React.FC = () => {
  const [isSocialsDialogOpen, setIsSocialsDialogOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-end"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/video/hero-bg.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional: Play Ring Icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img
          src="/icons/play-ring.svg"
          alt="Play background icon"
          className="w-64 h-64 opacity-10"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-20" />

      {/* Bottom Content */}
      <div className="relative z-30 text-center max-w-3xl mx-auto px-4 pb-20">
        <h1 className="text-white text-[28px] md:text-[48px] font-bold mb-4">
          The Best Streaming Experience
        </h1>

        <p className="text-gray-300 text-sm md:text-lg mb-3">
          StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more.
        </p>

        <p className="text-gray-300 text-sm md:text-lg mb-8">
          You can also create your own watchlists, so you can easily find the content you want to watch.
        </p>

        <SocialsDialog
          open={isSocialsDialogOpen}
          onOpenChange={setIsSocialsDialogOpen}
        >
          <button
            className="bg-red-600 text-white hover:bg-red-700 transition-colors text-sm md:text-base font-medium py-2 px-6 rounded-md"
            onClick={() => setIsSocialsDialogOpen(true)}
          >
            Start Watching Now
          </button>
        </SocialsDialog>
      </div>
    </section>
  );
};
