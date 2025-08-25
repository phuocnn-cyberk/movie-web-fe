"use client";

import { getDirectDropboxLink } from "@/lib/getDirectDropboxLink";
import { Movie } from "@/types/api";
import { Play } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import VideoPlayer from "../video-player/video-player";

interface MovieDetailHeroProps {
  movie: Movie;
}

export const MovieDetailHero: React.FC<MovieDetailHeroProps> = ({ movie }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const handlePlayVideo = () => setIsPlayingVideo(true);
  const handleCloseVideo = () => setIsPlayingVideo(false);

  return (
    <section className="w-full px-20 py-0">
      <div className="relative w-full overflow-hidden rounded-xl border border-[#262626]" style={{ height: "835px" }}>
        <div className="absolute inset-0">
          {isPlayingVideo ? (
            <VideoPlayer movieId={movie.movieID} onClose={handleCloseVideo} className="h-full w-full" />
          ) : (
            <>
              <video
                src={getDirectDropboxLink(movie.trailerURL)}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                poster={movie.poster}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0) 100%)",
                }}
              />
            </>
          )}
        </div>

        {!isPlayingVideo && (
          <div
            className="relative z-10 flex h-full flex-col items-center justify-end"
            style={{ padding: "50px 50px 20px" }}
          >
            <div className="mb-8 flex w-full flex-col items-center" style={{ padding: "0px 150px" }}>
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

            <div className="flex items-center gap-5">
              <Button
                onClick={handlePlayVideo}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#E50000] font-semibold text-white transition-all duration-300 hover:bg-[#CC0000] disabled:opacity-50"
                style={{
                  padding: "14px 24px",
                  fontFamily: "Manrope",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "1.53em",
                }}
              >
                <Play className="h-7 w-7 fill-white" />
                Play Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
