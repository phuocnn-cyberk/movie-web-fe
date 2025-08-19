import { Button } from "@/components/ui/button";
import { Movie } from "@/types/api";
import { Bookmark, Heart, Play, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  const router = useRouter();

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <div
          key={movie.movieID}
          className="group relative overflow-hidden rounded-lg border border-[#262626] bg-[#1A1A1A] transition-all duration-300 hover:border-[#E50000]"
          onClick={() => handleMovieClick(movie.movieID)}
        >
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay khi hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center gap-2">
                <Button size="sm" className="rounded-full bg-[#E50000] p-2 text-white hover:bg-[#CC0000]">
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
                  className="rounded-full border-white/30 bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-white">{movie.averageRating?.toFixed(1) || "N/A"}</span>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="mb-1 line-clamp-2 font-[Manrope] text-sm font-semibold text-white transition-colors group-hover:text-[#E50000]">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-[#999999]">
              <span className="font-[Manrope]">{movie.genres?.map((g) => g.name).join(", ") || "N/A"}</span>
              <span className="font-[Manrope]">{movie.year}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
