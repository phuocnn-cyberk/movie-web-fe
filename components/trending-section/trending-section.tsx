"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Eye } from "lucide-react";

const trendingMovies = [
  {
    id: 1,
    image: "/images/movie-posters/action-card.png",
    duration: "1h 30min",
    views: "2K"
  },
  {
    id: 2,
    image: "/images/movie-posters/adventure-card.png",
    duration: "1h 57min",
    views: "1.5K"
  },
  {
    id: 3,
    image: "/images/movie-posters/comedy-card.png",
    duration: "2h 10min",
    views: "1.8K"
  },
  {
    id: 4,
    image: "/images/movie-posters/drama-card.png",
    duration: "2h 20min",
    views: "3K"
  },
  {
    id: 5,
    image: "/images/movie-posters/horror-card.png",
    duration: "1h 42min",
    views: "5K"
  },
];

const SectionHeader = () => (
  <div className="flex items-center justify-between mb-12">
    <h2 className="text-3xl lg:text-4xl font-bold text-white font-[Manrope]">Trending Now</h2>
    <div className="flex items-center gap-4 bg-[#0F0F0F] border border-[#1F1F1F] rounded-xl p-4">
      <button className="p-3 bg-[#1A1A1A] border border-[#1F1F1F] rounded-lg hover:bg-[#262626] transition-colors">
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      <div className="flex gap-1">
        <div className="w-6 h-1 bg-[#E50000] rounded-full"></div>
        <div className="w-6 h-1 bg-[#333333] rounded-full"></div>
        <div className="w-6 h-1 bg-[#333333] rounded-full"></div>
        <div className="w-6 h-1 bg-[#333333] rounded-full"></div>
      </div>
      <button className="p-3 bg-[#1A1A1A] border border-[#1F1F1F] rounded-lg hover:bg-[#262626] transition-colors">
        <ChevronRight className="w-7 h-7 text-white" />
      </button>
    </div>
  </div>
);

const TrendingCard = ({ movie }: { movie: typeof trendingMovies[0] }) => (
  <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-5 group hover:border-[#3A3A3A] transition-all duration-300 cursor-pointer">
    <div className="relative h-80 mb-5 overflow-hidden rounded-xl">
      <Image
        src={movie.image}
        alt="Trending Movie"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-3 py-2">
        <Clock className="w-6 h-6 text-[#999999]" />
        <span className="text-[#999999] text-sm font-medium font-[Manrope]">{movie.duration}</span>
      </div>
      <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-3 py-2">
        <Eye className="w-6 h-6 text-[#999999]" />
        <span className="text-[#999999] text-sm font-medium font-[Manrope]">{movie.views}</span>
      </div>
    </div>
  </div>
);

export const TrendingSection = () => {
  return (
    <section className="px-20 py-16">
      <SectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {trendingMovies.map((movie) => (
          <TrendingCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}; 