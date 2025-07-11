import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Bookmark, Heart, Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
}

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="group relative bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#262626] hover:border-[#E50000] transition-all duration-300">
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay khi hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Button 
                  size="sm"
                  className="bg-[#E50000] hover:bg-[#CC0000] text-white p-2 rounded-full"
                >
                  <Play className="w-4 h-4 fill-white" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-black/50 border-white/30 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-black/50 border-white/30 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-black/70 rounded-md px-2 py-1 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-medium">{movie.rating}</span>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm mb-1 font-[Manrope] line-clamp-2 group-hover:text-[#E50000] transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between text-[#999999] text-xs">
              <span className="font-[Manrope]">{movie.genre}</span>
              <span className="font-[Manrope]">{movie.year}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 