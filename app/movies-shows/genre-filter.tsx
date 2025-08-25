"use client";

import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoviesData } from "@/hooks/movies/useMoviesData";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const GenreFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const searchParams = useSearchParams();

  const { movies, genresList, isLoading, error } = useMoviesData();

  useEffect(() => {
    const genreFromUrl = searchParams.get("genre");
    if (genreFromUrl && genresList.includes(genreFromUrl)) {
      setSelectedGenre(genreFromUrl);
    }
  }, [searchParams, genresList]);

  const filteredMovies = useMemo(() => {
    if (selectedGenre === "All") {
      return movies;
    }
    return movies.filter((movie) => movie.genres?.some((genre) => genre.name === selectedGenre));
  }, [movies, selectedGenre]);

  if (isLoading) {
    return (
      <>
        <div className="mb-12">
          <Skeleton className="mb-4 h-10 w-1/3 bg-gray-700" />
          <Skeleton className="h-6 w-2/3 bg-gray-700" />
        </div>
        <div className="mb-8 flex flex-wrap gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full bg-gray-700" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[2/3] w-full bg-gray-700" />
              <Skeleton className="mt-4 h-5 w-5/6 bg-gray-700" />
              <Skeleton className="mt-2 h-4 w-1/2 bg-gray-700" />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h3 className="mb-2 text-xl font-bold text-red-400">Something went wrong</h3>
        <p className="text-red-300/80">We couldn&apos;t load the movies. Please try again later.</p>
        <p className="mt-4 text-xs text-red-300/50">({error.message})</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12">
        <h2 className="mb-4 font-[Manrope] text-3xl font-bold text-white md:text-4xl">Our Genres</h2>
        <p className="font-[Manrope] text-lg text-[#999999]">
          Explore our diverse collection of movies and shows from action, horror, and more
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3 sm:gap-4">
        {genresList.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F0F] focus:outline-none ${
              selectedGenre === genre
                ? "border-[#E50000] bg-[#E50000] text-white shadow-lg shadow-[#E50000]/20"
                : "border-[#333333] bg-[#1A1A1A] text-[#999999] hover:border-[#E50000] hover:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} />
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-[#262626] bg-[#1A1A1A] p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-white">No Movies Found</h3>
          <p className="text-[#999999]">There are no movies in the &quot;{selectedGenre}&quot; genre at the moment.</p>
        </div>
      )}
    </>
  );
};

export default GenreFilter;
