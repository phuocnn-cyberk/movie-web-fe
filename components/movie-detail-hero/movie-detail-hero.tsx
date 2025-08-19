"use client";

import { Movie } from "@/types/api";
import { Bookmark, Heart, Play, Share } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import VideoPlayer from "../video-player/video-player";

interface MovieDetailHeroProps {
  movie: Movie;
}

export const MovieDetailHero: React.FC<MovieDetailHeroProps> = ({ movie }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const handlePlayVideo = () => {
    setIsPlayingVideo(true);
  };

  const handleCloseVideo = () => {
    setIsPlayingVideo(false);
  };
  return (
    <section className="w-full px-20 py-0">
      {/* Main Container - Exact Figma Dimensions */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#262626]" style={{ height: "835px" }}>
        {/* Background Image or Video Player */}
        <div className="absolute inset-0">
          {isPlayingVideo ? (
            <VideoPlayer movieId={movie.movieID} onClose={handleCloseVideo} className="h-full w-full" />
          ) : (
            <>
              <Image src={movie.poster} alt={movie.title} fill className="object-cover" priority />
              {/* Gradient Overlay - Bottom to Top */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0) 100%)",
                }}
              />
            </>
          )}
        </div>

        {/* Content Container - Figma Layout */}
        {!isPlayingVideo && (
          <div
            className="relative z-10 flex h-full flex-col items-center justify-end"
            style={{ padding: "50px 50px 20px" }}
          >
            {/* Text Container - Figma Specs */}
            <div className="mb-8 flex w-full flex-col items-center" style={{ padding: "0px 150px" }}>
              {/* Movie Title */}
              <h1
                className="mb-1 text-center font-bold text-white"
                style={{
                  fontFamily: "Manrope",
                  fontSize: "38px",
                  lineHeight: "1.5em",
                }}
              >
                {movie.title}
              </h1>

              {/* Movie Description */}
              <p
                className="text-center text-[#999999]"
                style={{
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  lineHeight: "1.5em",
                }}
              >
                {movie.description}
              </p>
            </div>

            {/* Buttons Container */}
            <div className="flex items-center gap-5">
              {/* Play Now Button - Red */}
              <Button
                onClick={handlePlayVideo}
                className="flex items-center gap-1 rounded-lg bg-[#E50000] font-semibold text-white transition-all duration-300 hover:bg-[#CC0000] disabled:opacity-50"
                style={{
                  padding: "14px 24px",
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "1.53em",
                }}
              >
                <Play className="h-7 w-7 fill-white" />
                Phát ngay
              </Button>

              {/* Action Buttons Container */}
              <div className="flex items-center gap-3">
                {/* Bookmark Button */}
                <button className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-[14px] transition-colors duration-200 hover:bg-[#1A1A1A]">
                  <Bookmark className="h-7 w-7 text-white" strokeWidth={2} />
                </button>

                {/* Heart Button */}
                <button className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-[14px] transition-colors duration-200 hover:bg-[#1A1A1A]">
                  <Heart className="h-7 w-7 text-white" strokeWidth={2} />
                </button>

                {/* Share Button */}
                <button className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-[14px] transition-colors duration-200 hover:bg-[#1A1A1A]">
                  <Share className="h-7 w-7 text-white" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
