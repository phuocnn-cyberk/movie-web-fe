"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Share2, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

const banners = [
  {
    image: "/images/avenger.png",
    title: "Avengers : Endgame",
    description: `With the help of remaining allies, the Avengers must assemble once more to reverse Thanos' actions and undo the chaos to the universe. No matter what consequences may be in store, and no matter who they face... Avenge the fallen.`,
  },
  {
    image: "/images/avenger.png",
    title: "Avengers : Startgame",
    description: `With the help of remaining allies.`,
  },
];

export function Banner() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    handleSelect(); // gọi ngay lần đầu để set initial index

    return () => {
      api.off("select", handleSelect); // cleanup khi unmount
    };
  }, [api]);

  return (
    <div className="mx-auto max-w-[90%] relative">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <section
                className="relative h-[600px] bg-cover bg-center rounded-xl overflow-hidden"
                style={{ backgroundImage: `url('${banner.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white px-4">
                  <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
                  <p className="text-sm max-w-2xl mx-auto mb-6 opacity-80">
                    {banner.description}
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded px-6 py-2 text-sm font-medium">
                      ▶ Play Now
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <ThumbsUp size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Share2 size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Volume2 size={20} />
                    </Button>
                  </div>

                  {/* Dot Indicators */}
                  <div className="flex justify-center gap-2 mt-2">
                    {banners.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? "bg-red-600"
                            : "bg-gray-400 opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 top-[50%] translate-y-[-50%]" />
        <CarouselNext className="right-4 top-[50%] translate-y-[-50%]" />
      </Carousel>
    </div>
  );
}
