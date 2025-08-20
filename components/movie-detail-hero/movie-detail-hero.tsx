"use client";

import { useAddFavourite } from "@/hooks/favourite/useAddFavourite";
import { useFavouriteList } from "@/hooks/favourite/useFavouriteList";
import { useRemoveFavourite } from "@/hooks/favourite/useRemoveFavourite";
import { Movie } from "@/types/api";
import { Bookmark, Heart, Play, Share } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import VideoPlayer from "../video-player/video-player";
import { getDirectDropboxLink } from "@/lib/getDirectDropboxLink"; // 👈 import helper

interface MovieDetailHeroProps {
  movie: Movie;
}

export const MovieDetailHero: React.FC<MovieDetailHeroProps> = ({ movie }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const { mutate: addFavorite } = useAddFavourite();
  const { mutate: removeFavorite } = useRemoveFavourite();
  const { favouriteList } = useFavouriteList();
  const isFavorite = favouriteList?.some((fav) => fav.movieId === movie.movieID);

  const handlePlayVideo = () => setIsPlayingVideo(true);
  const handleCloseVideo = () => setIsPlayingVideo(false);

  const handleToggleFavorite = (movieId: number) => {
    if (isFavorite) removeFavorite(movieId);
    else addFavorite(movieId);
  };

  return (
    <section className="w-full px-20 py-0">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-[#262626]"
        style={{ height: "835px" }}
      >
        <div className="absolute inset-0">
          {isPlayingVideo ? (
            <VideoPlayer
              movieId={movie.movieID}
              onClose={handleCloseVideo}
              className="h-full w-full"
            />
          ) : (
            <>
              <video
                src={getDirectDropboxLink(movie.trailerURL)} // 👈 convert Dropbox link
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
                  background:
                    "linear-gradient(180deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0) 100%)",
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
            <div
              className="mb-8 flex w-full flex-col items-center"
              style={{ padding: "0px 150px" }}
            >
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
                Play Now
              </Button>

              <div className="flex items-center gap-3">
                <button className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-2 transition-colors duration-200 hover:bg-[#1A1A1A]">
                  <Bookmark className="h-7 w-7 text-white" strokeWidth={2} />
                </button>

                <button
                  className="cursor-pointer rounded-lg border border-[#262626] bg-[#0F0F0F] p-2 transition-colors duration-200 hover:bg-[#1A1A1A]"
                  onClick={() => handleToggleFavorite(movie.movieID)}
                  style={{ backgroundColor: isFavorite ? "#E50000" : "#0F0F0F" }}
                >
                  <Heart
                    className="h-7 w-7 text-white"
                    strokeWidth={2}
                    fill={isFavorite ? "red" : "none"}
                  />
                </button>

                <button className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-2 transition-colors duration-200 hover:bg-[#1A1A1A]">
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
