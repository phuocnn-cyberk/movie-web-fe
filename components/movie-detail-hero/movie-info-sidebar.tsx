"use client";

import React from "react";
import { Calendar, Globe, Star, Film } from "lucide-react";

interface MovieData {
  year: number;
  genre: string;
  duration: string;
  rating: number;
}

interface MovieInfoSidebarProps {
  movie: MovieData;
}

export const MovieInfoSidebar: React.FC<MovieInfoSidebarProps> = ({ movie }) => {
  const movieInfo = [
    {
      label: "Released Year",
      value: movie.year.toString(),
      icon: <Calendar className="w-4 h-4" />
    },
    {
      label: "Available Languages",
      value: ["English", "Hindi", "Telugu"],
      icon: <Globe className="w-4 h-4" />
    },
    {
      label: "Ratings",
      value: `${movie.rating}/10`,
      icon: <Star className="w-4 h-4" />
    },
    {
      label: "Genres",
      value: [movie.genre, "Adventure", "Drama"],
      icon: <Film className="w-4 h-4" />
    }
  ];

  const crewInfo = [
    {
      label: "Director",
      name: "Rishab Shetty",
      avatar: "/images/avatars/director.png"
    },
    {
      label: "Music",
      name: "B. Ajaneesh Loknath",
      avatar: "/images/avatars/music.png"
    }
  ];

  return (
    <div className="w-[519px] flex-shrink-0">
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-[50px]">
        {/* Movie Info Items */}
        <div className="space-y-[30px] mb-[30px]">
          {movieInfo.map((item, index) => (
            <div key={index} className="flex flex-col gap-[14px]">
              <div className="flex items-center gap-1 text-[#999999]">
                {item.icon}
                <span className="text-[18px] font-medium font-[Manrope]">
                  {item.label}
                </span>
              </div>
              
              {Array.isArray(item.value) ? (
                <div className="flex flex-wrap gap-[10px]">
                  {item.value.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-[#141414] border border-[#262626] px-[14px] py-[14px] rounded-lg text-white text-[20px] font-semibold font-[Manrope]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-white text-[20px] font-semibold font-[Manrope]">
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Crew Info */}
        <div className="space-y-[30px]">
          {crewInfo.map((crew, index) => (
            <div key={index} className="flex flex-col gap-[14px]">
              <h3 className="text-[18px] font-medium text-[#999999] font-[Manrope]">
                {crew.label}
              </h3>
              <div className="bg-[#141414] border border-[#262626] rounded-lg p-[14px] flex items-center gap-[10px]">
                <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center">
                  <span className="text-white font-semibold text-[14px] font-[Manrope]">
                    {crew.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-white text-[16px] font-medium font-[Manrope]">
                  {crew.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 