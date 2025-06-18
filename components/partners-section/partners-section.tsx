"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  },
];

export default function CategorySlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1.5, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3.5, spacing: 16 },
      },
    },
  });

  return (
    <section className="px-6 md:px-16 py-12 md:py-20 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Explore our wide variety of categories</h2>
          <p className="text-sm text-gray-400">
            Whether you&apos;re looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="bg-gray-800 p-2 rounded hover:bg-gray-700"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="bg-gray-800 p-2 rounded hover:bg-gray-700"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {categories.map((category, idx) => (
          <div key={idx} className="keen-slider__slide">
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
          </div>
        ))}
      </div>
    </section>
  );
}
