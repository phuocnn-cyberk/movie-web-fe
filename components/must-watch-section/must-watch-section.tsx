"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";

const mustWatchMovies = [
  {
    id: 1,
    image: "/images/movie-posters/action-card.png",
    duration: "1h 57min",
    rating: "20K"
  },
  {
    id: 2,
    image: "/images/movie-posters/adventure-card.png",
    duration: "1h 30min",
    rating: "20K"
  },
  {
    id: 3,
    image: "/images/movie-posters/comedy-card.png",
    duration: "1h 42min",
    rating: "20K"
  },
  {
    id: 4,
    image: "/images/movie-posters/drama-card.png",
    duration: "2h 10min",
    rating: "20K"
  },
];

const SectionHeader = () => (
  <div className="flex items-center justify-between mb-12">
    <h2 className="text-3xl lg:text-4xl font-bold text-white font-[Manrope]">Must - Watch Movies</h2>
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

const MustWatchCard = ({ movie }: { movie: typeof mustWatchMovies[0] }) => (
  <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-5 group hover:border-[#3A3A3A] transition-all duration-300 cursor-pointer">
    <div className="relative h-80 mb-5 overflow-hidden rounded-xl">
      <Image
        src={movie.image}
        alt="Must Watch Movie"
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
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((star) => (
            <Star key={star} className="w-4 h-4 fill-[#E50000] text-[#E50000]" />
          ))}
          <Star className="w-4 h-4 text-[#999999]" />
        </div>
        <span className="text-[#999999] text-sm font-medium font-[Manrope]">{movie.rating}</span>
      </div>
    </div>
  </div>
);

export const MustWatchSection = () => {
  return (
    <section className="px-20 py-16">
      <SectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mustWatchMovies.map((movie) => (
          <MustWatchCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}; 