"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Bookmark, Heart, Share, Play } from "lucide-react";

interface MovieData {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  year: number;
  genre: string;
  duration: string;
  rating: number;
}

interface MovieDetailHeroProps {
  movie: MovieData;
}

export const MovieDetailHero: React.FC<MovieDetailHeroProps> = ({ movie }) => {
  return (
    <section className="w-full px-20 py-0">
      {/* Main Container - Exact Figma Dimensions */}
      <div 
        className="relative w-full rounded-xl overflow-hidden border border-[#262626]"
        style={{ height: '835px' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={movie.backgroundImage}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Gradient Overlay - Bottom to Top */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0) 100%)'
            }}
          />
        </div>

        {/* Content Container - Figma Layout */}
        <div 
          className="relative z-10 h-full flex flex-col justify-end items-center"
          style={{ padding: '50px 50px 20px' }}
        >
          {/* Text Container - Figma Specs */}
          <div 
            className="flex flex-col items-center w-full mb-8"
            style={{ padding: '0px 150px' }}
          >
            {/* Movie Title */}
            <h1 
              className="text-white font-bold text-center mb-1"
              style={{ 
                fontFamily: 'Manrope', 
                fontSize: '38px', 
                lineHeight: '1.5em' 
              }}
            >
              {movie.title}
            </h1>
            
            {/* Movie Description */}
            <p 
              className="text-[#999999] text-center"
              style={{ 
                fontFamily: 'Manrope', 
                fontSize: '18px', 
                lineHeight: '1.5em' 
              }}
            >
              {movie.description}
            </p>
          </div>

          {/* Buttons Container */}
          <div className="flex items-center gap-5">
            {/* Play Now Button - Red */}
            <Button 
              className="bg-[#E50000] hover:bg-[#CC0000] text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-1"
              style={{ 
                padding: '14px 24px',
                fontFamily: 'Manrope',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '1.53em'
              }}
            >
              <Play className="w-7 h-7 fill-white" />
              Play Now
            </Button>

            {/* Action Buttons Container */}
            <div className="flex items-center gap-3">
              {/* Bookmark Button */}
              <button 
                className="bg-[#0F0F0F] border border-[#262626] rounded-lg p-[14px] hover:bg-[#1A1A1A] transition-colors duration-200"
              >
                <Bookmark className="w-7 h-7 text-white" strokeWidth={2} />
              </button>

              {/* Heart Button */}
              <button 
                className="bg-[#0F0F0F] border border-[#262626] rounded-lg p-[14px] hover:bg-[#1A1A1A] transition-colors duration-200"
              >
                <Heart className="w-7 h-7 text-white" strokeWidth={2} />
              </button>

              {/* Share Button */}
              <button 
                className="bg-[#0F0F0F] border border-[#262626] rounded-lg p-[14px] hover:bg-[#1A1A1A] transition-colors duration-200"
              >
                <Share className="w-7 h-7 text-white" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 