"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const topGenreCards = [
  {
    id: 1,
    genre: "Action",
    images: [
      "/images/movie-posters/action-card.png",
      "/images/movie-posters/action-card.png",
      "/images/movie-posters/action-card.png",
      "/images/movie-posters/action-card.png",
    ]
  },
  {
    id: 2,
    genre: "Adventure", 
    images: [
      "/images/movie-posters/adventure-card.png",
      "/images/movie-posters/adventure-card.png",
      "/images/movie-posters/adventure-card.png",
      "/images/movie-posters/adventure-card.png",
    ]
  },
  {
    id: 3,
    genre: "Comedy",
    images: [
      "/images/movie-posters/comedy-card.png",
      "/images/movie-posters/comedy-card.png",
      "/images/movie-posters/comedy-card.png",
      "/images/movie-posters/comedy-card.png",
    ]
  },
  {
    id: 4,
    genre: "Drama",
    images: [
      "/images/movie-posters/drama-card.png",
      "/images/movie-posters/drama-card.png",
      "/images/movie-posters/drama-card.png",
      "/images/movie-posters/drama-card.png",
    ]
  },
];

const SectionHeader = () => (
  <div className="flex items-center justify-between mb-12">
    <h2 className="text-3xl lg:text-4xl font-bold text-white font-[Manrope]">Popular Top 10 In Genres</h2>
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

const TopGenreCard = ({ item }: { item: typeof topGenreCards[0] }) => (
  <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-8 group hover:border-[#3A3A3A] transition-all duration-300 h-fit cursor-pointer">
    <div className="grid grid-cols-2 gap-2 h-64 mb-6 relative overflow-hidden rounded-lg">
      {item.images.map((image, index) => (
        <div key={index} className="relative overflow-hidden rounded">
          <Image
            src={image}
            alt={`Top ${item.genre} ${index + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent pointer-events-none" />
    </div>
    <div className="flex items-center justify-between">
      <div>
        <div className="bg-[#E50000] text-white text-sm font-semibold px-3 py-1 rounded mb-1 inline-block">
          Top 10 In
        </div>
        <h3 className="text-xl font-semibold text-white font-[Manrope]">{item.genre}</h3>
      </div>
      <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform duration-200" />
    </div>
  </div>
);

export const TopGenresSection = () => {
  return (
    <section className="px-20 py-16">
      <SectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {topGenreCards.map((item) => (
          <TopGenreCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}; 