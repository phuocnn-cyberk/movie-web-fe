import { Button } from "@/components/ui/button";
import { useMovieInteractions } from "@/hooks/favourite/useMovieInteractions";
import { Movie, WatchHistory } from "@/types/api";
import { Bookmark, Heart, Play } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface MovieGridProps {
  movies: Movie[];
  watchHistoryMode?: boolean;
  watchHistoryData?: WatchHistory[];
}

export const MovieGrid = ({ movies, watchHistoryMode = false, watchHistoryData = [] }: MovieGridProps) => {
  const { handleMovieClick, handleToggleFavorite, favoriteMovieIds } = useMovieInteractions();

  const getWatchHistoryForMovie = (movieId: number) => {
    return watchHistoryData.find((item) => item.movieId === movieId);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => {
        const isFavorite = favoriteMovieIds.includes(movie.movieID);
        const watchHistory = watchHistoryMode ? getWatchHistoryForMovie(movie.movieID) : null;
        return (
          <div
            key={movie.movieID}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#262626] bg-[#1A1A1A] transition-all duration-300 hover:scale-105 hover:border-[#E50000]"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              {movie.accessLevel === "PREMIUM" && (
                <Badge variant="destructive" className="absolute top-2 left-2 z-10 !bg-[#E50000]">
                  Premium
                </Badge>
              )}
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {watchHistoryMode && watchHistory && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                  <div
                    className="h-1 bg-[#E50000]"
                    style={{ width: `${watchHistory.watchedPercent}%` }}
                  />
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="cursor-pointer rounded-full bg-[#E50000] p-2 text-white hover:bg-[#CC0000]"
                    onClick={() => handleMovieClick(movie.movieID)}
                  >
                    <Play className="h-4 w-4 fill-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/30 bg-black/50 p-2 text-white hover:bg-black/70"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer rounded-full border-white/30 bg-black/50 p-2 text-white hover:bg-black/70"
                    onClick={() => handleToggleFavorite(movie.movieID)}
                  >
                    <Heart className="h-4 w-4" fill={isFavorite ? "red" : "none"} />
                  </Button>
                </div>
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
                <span className="text-xs font-medium text-white">{movie?.duration || "N/A"} min</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-1 line-clamp-2 font-[Manrope] text-sm font-semibold text-white transition-colors group-hover:text-[#E50000]">
                {movie.title}
              </h3>

              {watchHistoryMode && watchHistory ? (
                <div className="flex flex-col gap-2 text-xs text-[#999999]">
                  <div className="flex items-center justify-between">
                    <span className="font-[Manrope]">Trạng thái:</span>
                    <span className="font-[Manrope] font-medium text-[#E50000]">
                      {watchHistory.watchedPercent === 0
                        ? "Vừa bắt đầu"
                        : `Đã xem ${watchHistory.watchedPercent}%`}
                    </span>
                  </div>
                  <div className="font-[Manrope]">
                    Bắt đầu: {new Date(watchHistory.watchedAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-[#999999]">
                  <span className="font-[Manrope]">{movie.genres?.map((g) => g.name).join(", ") || "N/A"}</span>
                  <span className="font-[Manrope]">{movie.year}</span>
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
};
