"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const movies = [
  { title: "Kantara", img: "/images/kantara.jpg", duration: "1h 57min", rating: "20K" },
  { title: "Pushpa", img: "/images/pushpa.jpg", duration: "1h 30min", rating: "20K" },
  { title: "Blade Runner 2049", img: "/images/blade_runner.jpg", duration: "1h 42min", rating: "20K" },
  { title: "Adipurush", img: "/images/adipurush.jpg", duration: "2h 10min", rating: "20K" },
];

export function MovieCarousel({ title }: { title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // Lấy index lần đầu
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full relative px-10 py-6">
      <h2 className="text-2xl font-semibold mb-4 ml-5">{title}</h2>

      {/* Navigation group giống ảnh */}
      <div className="absolute top-2 right-20 z-20 flex items-center gap-2 bg-[#1f1f1f] px-3 py-1 shadow">
        <button onClick={scrollPrev} className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full flex items-center justify-center">
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-1.5 rounded-sm transition-all duration-200 ${
                index === selectedIndex ? "bg-red-500 w-3" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button onClick={scrollNext} className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full flex items-center justify-center">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Embla carousel */}
      <div className="flex flex-col items-center" ref={emblaRef}>
        <div className="flex gap-15">
          {movies.map((movie, index) => (
            <div key={index} className="min-w-[280px] bg-gray-900 p-2 rounded-lg shadow-md flex-shrink-0">
              <Image
                src={movie.img}
                alt={movie.title}
                width={220}
                height={300}
                className="rounded"
              />
              <div className="mt-auto">
                <h3 className="text-sm font-bold mt-2">{movie.title}</h3>
                <div className="flex justify-between text-xs mt-1 text-gray-400">
                  <span>🕒 {movie.duration}</span>
                  <span>⭐ {movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
