"use client";

import { Calendar, Film, Star } from "lucide-react";
import React from "react";
import { MovieDTO } from "@/types/api";

interface MovieInfoSidebarProps {
  movie: MovieDTO;
}

export const MovieInfoSidebar: React.FC<MovieInfoSidebarProps> = ({ movie }) => {
  const movieInfo = [
    {
      label: "Released Year",
      value: movie.year ? movie.year.toString() : "N/A",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: "Ratings",
      value: movie.averageRating !== undefined ? `${movie.averageRating}/10` : "N/A",
      icon: <Star className="h-4 w-4" />,
    },
    {
      label: "Genres",
      value: Array.isArray(movie.genres)
        ? movie.genres.map((g) => g.name).join(", ")
        : "N/A",
      icon: <Film className="h-4 w-4" />,
    },
  ];



  const crewInfo = [
    { label: "Director", name: "Rishab Shetty" },
    { label: "Music", name: "B. Ajaneesh Loknath" },
  ];

  return (
    <div className="w-[519px] flex-shrink-0">
      <div className="rounded-xl border border-[#262626] bg-[#1A1A1A] p-[50px]">
        <div className="mb-[30px] space-y-[30px]">
          {movieInfo.map((item, index) => (
            <div key={index} className="flex flex-col gap-[14px]">
              <div className="flex items-center gap-1 text-[#999999]">
                {item.icon}
                <span className="font-[Manrope] text-[18px] font-medium">{item.label}</span>
              </div>
              {Array.isArray(item.value) ? (
                <div className="flex flex-wrap gap-[10px]">
                  {item.value.map((tag, i) => (
                    <span key={i} className="rounded-lg border border-[#262626] bg-[#141414] px-[14px] py-[14px] text-[20px] font-semibold text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-[20px] font-semibold text-white">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-[30px]">
          {crewInfo.map((crew, index) => (
            <div key={index} className="flex flex-col gap-[14px]">
              <h3 className="text-[18px] font-medium text-[#999999]">{crew.label}</h3>
              <div className="flex items-center gap-[10px] rounded-lg border border-[#262626] bg-[#141414] p-[14px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#262626]">
                  <span className="text-[14px] font-semibold text-white">
                    {crew.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <span className="text-[16px] font-medium text-white">{crew.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
