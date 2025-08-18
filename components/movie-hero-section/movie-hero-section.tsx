"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export const MovieHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "The Transporter",
      description: "A skilled driver becomes a transporter for hire, bound by rules he must never break.",
      image: "/images/avengers-bg.png",
    },
    {
      id: 2,
      title: "God of Gamblers III",
      description: "Ko Chun finds himself in 1937 Shanghai where he must use his gambling skills to survive.",
      image: "/images/avengers-bg.png",
    },
    {
      id: 3,
      title: "Rush Hour 3",
      description: "Detectives Lee and Carter team up again to uncover a deadly Triad conspiracy in Paris.",
      image: "/images/avengers-bg.png",
    },
    {
      id: 4,
      title: "Bait (2012)",
      description: "A freak tsunami traps shoppers inside a coastal supermarket with bloodthirsty sharks.",
      image: "/images/avengers-bg.png",
    },
  ];

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
      {/* Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={slide.image} alt={slide.title} fill className="object-cover" priority />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end gap-10 px-10 pb-16 text-center">
        <h1 className="text-4xl font-bold text-white">{slides[currentSlide].title}</h1>
        <p className="max-w-3xl text-lg text-gray-300">{slides[currentSlide].description}</p>
        <Link href={`/movie/${slides[currentSlide].id}`}>
          <Button className="bg-red-600 hover:bg-red-700">
            <Play className="mr-2 h-5 w-5 fill-white" /> Play Now
          </Button>
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <Button variant="outline" onClick={prevSlide}>
            <ChevronLeft className="text-white" />
          </Button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 w-6 rounded-full ${
                  currentSlide === i ? "bg-red-600" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" onClick={nextSlide}>
            <ChevronRight className="text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};
