// components/CategorySlider.tsx
"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Action",
    posters: ["/images/action1.jpg", "/images/action2.jpg", "/images/action3.jpg", "/images/action4.jpg"],
  },
  {
    name: "Adventure",
    posters: ["/images/adv1.jpg", "/images/adv2.jpg", "/images/adv3.jpg", "/images/adv4.jpg"],
  },
  {
    name: "Comedy",
    posters: ["/images/comedy1.jpg", "/images/comedy2.jpg", "/images/comedy3.jpg", "/images/comedy4.jpg"],
  },
  {
    name: "Drama",
    posters: ["/images/drama1.jpg", "/images/drama2.jpg", "/images/drama3.jpg", "/images/drama4.jpg"],
  },
  {
    name: "Horror",
    posters: ["/images/horror1.jpg", "/images/horror2.jpg", "/images/horror3.jpg", "/images/horror4.jpg"],
  },
];

export default function CategorySlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3.5,
      spacing: 16,
    },
  });

  return (
    <section className="px-6 md:px-16 py-12 md:py-20 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Explore our wide variety of categories</h2>
          <p className="text-sm text-gray-400">
            Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
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
                  <img
                    key={i}
                    src={poster}
                    alt={`${category.name} poster ${i}`}
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
