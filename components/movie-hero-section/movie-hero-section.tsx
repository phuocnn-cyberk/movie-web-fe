"use client";

import { Button } from "@/components/ui/button";
import { useGetMovies } from "@/hooks/movies/useGetMovies";
import { Bookmark, ChevronLeft, ChevronRight, Heart, Play, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export const MovieHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: movies } = useGetMovies();

  const slides = movies?.slice(0, 4) || [];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[835px] w-full">
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end gap-[50px] px-[50px] py-[50px] pb-[20px]">
        <div className="flex flex-col items-center justify-end gap-[30px] self-stretch">
          <div className="flex flex-col items-center gap-1 self-stretch px-[150px]">
            <h1 className="w-full text-center font-[Manrope] text-[38px] leading-[1.5em] font-bold text-white">
              {slides[currentSlide].title}
            </h1>
            <p className="w-full text-center font-[Manrope] text-[18px] leading-[1.5em] font-medium text-[#999999]">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Link href={`/movie/${slides[currentSlide].movieID}`}>
              <Button className="flex items-center gap-1 rounded-lg bg-[#E50000] px-6 py-[14px] font-[Manrope] text-[18px] font-semibold text-white transition-all duration-300 hover:bg-[#CC0000]">
                <div className="flex h-7 w-7 items-center justify-center">
                  <Play className="h-[19.19px] w-[17.84px] fill-white" />
                </div>
                Play Now
              </Button>
            </Link>

            <div className="flex items-center gap-[10px]">
              <Button
                variant="outline"
                className="rounded-lg border-[#262626] bg-[#0F0F0F] p-[14px] hover:border-[#404040]"
              >
                <Bookmark className="h-[14px] w-[14px] text-white" />
              </Button>
              <Button
                variant="outline"
                className="rounded-lg border-[#262626] bg-[#0F0F0F] p-[14px] hover:border-[#404040]"
              >
                <Heart className="h-[21px] w-[22.75px] text-white" />
              </Button>
              <Button
                variant="outline"
                className="rounded-lg border-[#262626] bg-[#0F0F0F] p-[14px] hover:border-[#404040]"
              >
                <Share2 className="h-[20.28px] w-[22.75px] text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 self-stretch">
          <Button
            variant="outline"
            onClick={prevSlide}
            className="rounded-lg border-[#1F1F1F] bg-[#0F0F0F] p-[14px] hover:border-[#404040]"
          >
            <ChevronLeft className="h-[15.75px] w-[17.5px] text-white" />
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
            className="rounded-lg border-[#1F1F1F] bg-[#0F0F0F] p-[14px] hover:border-[#404040]"
          >
            <ChevronRight className="h-[17.5px] w-[21px] text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};
