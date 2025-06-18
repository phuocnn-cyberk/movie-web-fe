"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Thư viện shadcn/ui
import Image from "next/image";

const categories = [
  {
    name: "Action",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },
  {
    name: "Adventure",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },
  {
    name: "Comedy",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },
  {
    name: "Drama",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },
  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },  {
    name: "Horror",
    posters: ["/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png", "/images/helix-token.png"],
  },
];

export default function CategorySlider() {
  return (
    <section className="px-6 md:px-16 py-12 md:py-20 bg-black text-white">
 

    <Carousel opts={{ align: "start" , loop: true}} className="w-full">
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-2xl font-bold">Explore our wide variety of categories</h2>
      <p className="text-sm text-gray-400">
        Whether you&apos;re looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
      </p>
    </div>
    <div className="hidden md:flex gap-2">
      <CarouselPrevious className="bg-gray-800 hover:bg-gray-700 text-white" />
      <CarouselNext className="bg-gray-800 hover:bg-gray-700 text-white" />
    </div>
  </div>

  <CarouselContent className="-ml-4">
    {categories.map((category, idx) => (
      <CarouselItem
        key={idx}
        className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
      >
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {category.posters.map((poster, i) => (
              <Image
                key={i}
                src={poster}
                alt={`${category.name} poster ${i}`}
                width={300}
                height={100}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">{category.name}</span>
            <button className="text-gray-400 hover:text-accent">→</button>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>

    </section>
  );
}
