"use client";

import { Movie } from "@/types/api";
import { Calendar, Film } from "lucide-react";
import React from "react";

interface MovieInfoSidebarProps {
  movie: Movie;
}

export const MovieInfoSidebar: React.FC<MovieInfoSidebarProps> = ({ movie }) => {
  const movieInfo = [
    {
      label: "Released Year",
      value: movie.year?.toString() || "",
      icon: <Calendar className="h-4 w-4" />,
    },
    // {
    //   label: "Available Languages",
    //   value: ["English", "Hindi", "Telugu"],
    //   icon: <Globe className="w-4 h-4" />
    // },
    // {
    //   label: "Ratings",
    //   value: `${movie.rating || 0}/10`,
    //   icon: <Star className="h-4 w-4" />,
    // },
    {
      label: "Genres",
      value: movie.genres.map((genre) => genre.name),
      icon: <Film className="h-4 w-4" />,
    },
  ];

  const crewInfo = [
    {
      label: "Director",
      name: "Rishab Shetty",
      avatar: "/images/avatars/director.png",
    },
    {
      label: "Music",
      name: "B. Ajaneesh Loknath",
      avatar: "/images/avatars/music.png",
    },
  ];

  return (
    <div className="w-[519px] flex-shrink-0">
      <div className="rounded-xl border border-[#262626] bg-[#1A1A1A] p-[50px]">
        {/* Movie Info Items */}
        <div className="mb-[30px] space-y-[30px]">
          {movieInfo.map((item, index) => (
            <div key={index} className="flex flex-col gap-[14px]">
              <div className="flex items-center gap-1 text-[#999999]">
                {item.icon}
                <span className="font-[Manrope] text-[18px] font-medium">{item.label}</span>
              </div>

              {Array.isArray(item.value) ? (
                <div className="flex flex-wrap gap-[10px]">
                  {item.value.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-lg border border-[#262626] bg-[#141414] px-[14px] py-[14px] font-[Manrope] text-[20px] font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="font-[Manrope] text-[20px] font-semibold text-white">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Crew Info */}
        <div className="space-y-[30px]">
          {crewInfo.map((crew, index) => (
            <div key={index} className="flex flex-col gap-[14px]">
              <h3 className="font-[Manrope] text-[18px] font-medium text-[#999999]">{crew.label}</h3>
              <div className="flex items-center gap-[10px] rounded-lg border border-[#262626] bg-[#141414] p-[14px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#262626]">
                  <span className="font-[Manrope] text-[14px] font-semibold text-white">
                    {crew.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <span className="font-[Manrope] text-[16px] font-medium text-white">{crew.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
