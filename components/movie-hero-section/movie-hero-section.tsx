"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Bookmark, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export const MovieHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Avengers : Endgame",
      description: "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
      image: "/images/avengers-bg.png"
    },
    {
      id: 2,
      title: "Avengers : Infinity War",
      description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
      image: "/images/avengers-bg.png"
    },
    {
      id: 3,
      title: "Avengers : Age of Ultron",
      description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      image: "/images/avengers-bg.png"
    },
    {
      id: 4,
      title: "The Avengers",
      description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      image: "/images/avengers-bg.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[835px] ">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image 
                src={slide.image} 
                alt={slide.title} 
                fill 
                className="object-cover" 
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/0 to-[#141414]/0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end items-center gap-[50px] px-[50px] py-[50px] pb-[20px]">
        <div className="flex flex-col justify-end items-center self-stretch gap-[30px]">
          <div className="flex flex-col items-center self-stretch gap-1 px-[150px]">
            <h1 className="text-[38px] font-bold text-white leading-[1.5em] text-center font-[Manrope] w-full">
              {slides[currentSlide].title}
            </h1>
            <p className="text-[18px] text-[#999999] leading-[1.5em] text-center font-[Manrope] font-medium w-full">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Link href={`/movie/${slides[currentSlide].id}`}>
              <Button 
                className="bg-[#E50000] hover:bg-[#CC0000] text-white font-semibold px-6 py-[14px] text-[18px] rounded-lg transition-all duration-300 font-[Manrope] flex items-center gap-1"
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <Play className="w-[17.84px] h-[19.19px] fill-white" />
                </div>
                Play Now
              </Button>
            </Link>

            <div className="flex items-center gap-[10px]">
              <Button 
                variant="outline"
                className="bg-[#0F0F0F] border-[#262626] hover:border-[#404040] p-[14px] rounded-lg"
              >
                <Bookmark className="w-[14px] h-[14px] text-white" />
              </Button>
              <Button 
                variant="outline"
                className="bg-[#0F0F0F] border-[#262626] hover:border-[#404040] p-[14px] rounded-lg"
              >
                <Heart className="w-[22.75px] h-[21px] text-white" />
              </Button>
              <Button 
                variant="outline"
                className="bg-[#0F0F0F] border-[#262626] hover:border-[#404040] p-[14px] rounded-lg"
              >
                <Share2 className="w-[22.75px] h-[20.28px] text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between self-stretch gap-4">
          <Button 
            variant="outline"
            onClick={prevSlide}
            className="bg-[#0F0F0F] border-[#1F1F1F] hover:border-[#404040] p-[14px] rounded-lg"
          >
            <ChevronLeft className="w-[17.5px] h-[15.75px] text-white" />
          </Button>

          <div className="flex items-center gap-[3px] w-[81px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-[23px] bg-[#E50000]' 
                    : 'flex-1 bg-[#333333]'
                }`}
              />
            ))}
          </div>

          <Button 
            variant="outline"
            onClick={nextSlide}
            className="bg-[#0F0F0F] border-[#1F1F1F] hover:border-[#404040] p-[14px] rounded-lg"
          >
            <ChevronRight className="w-[21px] h-[17.5px] text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
}; 