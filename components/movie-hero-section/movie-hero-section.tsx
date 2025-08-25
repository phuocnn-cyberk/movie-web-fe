"use client";

import { Button } from "@/components/ui/button";
import { useMovieSlide } from "@/hooks/favourite/useMovieSlide";
import { Bookmark, ChevronLeft, ChevronRight, Heart, Play, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MovieHeroSection = () => {
  const { currentSlide, slides, isLoading, nextSlide, prevSlide, goToSlide, favoriteMovieIds, handleToggleFavorite } =
    useMovieSlide();

  if (isLoading) {
    return (
      <section className="relative h-screen w-full animate-pulse bg-gray-800">
        <div className="relative z-10 flex h-full flex-col items-center justify-end gap-[50px] px-[50px] py-[50px] pb-[20px]">
          <div className="flex flex-col items-center justify-end gap-[30px] self-stretch">
            <div className="flex flex-col items-center gap-1 self-stretch px-[150px]">
              <div className="h-14 w-3/4 rounded bg-gray-700"></div>
              <div className="mt-4 h-6 w-full rounded bg-gray-700"></div>
              <div className="mt-2 h-6 w-5/6 rounded bg-gray-700"></div>
            </div>
            <div className="flex items-center gap-5">
              <div className="h-[58px] w-40 rounded-lg bg-gray-700"></div>
              <div className="h-[58px] w-[58px] rounded-lg bg-gray-700"></div>
              <div className="h-[58px] w-[58px] rounded-lg bg-gray-700"></div>
              <div className="h-[58px] w-[58px] rounded-lg bg-gray-700"></div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-4 self-stretch">
            <div className="h-[51px] w-[51px] rounded-lg bg-gray-700"></div>
            <div className="flex h-1 w-[81px] items-center gap-[3px]">
              <div className="h-full w-[23px] rounded-full bg-gray-700"></div>
              <div className="h-full flex-1 rounded-full bg-gray-600"></div>
              <div className="h-full flex-1 rounded-full bg-gray-600"></div>
              <div className="h-full flex-1 rounded-full bg-gray-600"></div>
            </div>
            <div className="h-[51px] w-[51px] rounded-lg bg-gray-700"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.movieID}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image src={slide.poster} alt={slide.title} fill className="object-cover" priority={index === 0} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/0 to-[#141414]/0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/0 to-[#141414]/0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end gap-10 px-10 py-10 pb-5">
        <div className="flex flex-col items-center justify-end gap-8">
          <div className="flex flex-col items-center gap-1">
            <h1 className="w-full text-center font-[Manrope] text-2xl leading-tight font-bold text-white">
              {slides[currentSlide].title}
            </h1>
            <p className="w-full text-center font-[Manrope] text-lg leading-tight font-medium text-[#999999]">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Link href={`/movie/${slides[currentSlide].movieID}`}>
              <Button className="flex items-center gap-1 rounded-lg bg-[#E50000] px-6 py-[14px] font-[Manrope] text-[18px] font-semibold text-white transition-all duration-300 hover:bg-[#CC0000]">
                <div className="flex h-7 w-7 items-center justify-center">
                  <Play className="h-5 w-5 fill-white" />
                </div>
                Play Now
              </Button>
            </Link>

            <div className="flex items-center gap-[10px]">
              <Button variant="outline" className="rounded-lg border-[#262626] bg-[#0F0F0F] hover:border-[#404040]">
                <Bookmark className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer rounded-lg border-[#262626] bg-[#0F0F0F] hover:border-[#404040]"
                onClick={() => handleToggleFavorite(slides[currentSlide].movieID)}
              >
                <Heart
                  className="h-5 w-5 text-white"
                  fill={favoriteMovieIds.includes(slides[currentSlide].movieID) ? "red" : "none"}
                />
              </Button>
              <Button variant="outline" className="rounded-lg border-[#262626] bg-[#0F0F0F] hover:border-[#404040]">
                <Share2 className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 self-stretch">
          <Button
            variant="outline"
            onClick={prevSlide}
            className="cursor-pointer rounded-lg border-[#1F1F1F] bg-[#0F0F0F] hover:border-[#404040]"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>

          <div className="flex w-[81px] items-center gap-[3px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-[23px] bg-[#E50000]" : "flex-1 bg-[#333333]"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            className="cursor-pointer rounded-lg border-[#1F1F1F] bg-[#0F0F0F] hover:border-[#404040]"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};
