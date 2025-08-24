"use client";

import { Footer } from "@/components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";
import { Header } from "@/components/common/header";
import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { MovieHeroSection } from "@/components/movie-hero-section/movie-hero-section";
import { useAddFavourite } from "@/hooks/favourite/useAddFavourite";
import { useRemoveFavourite } from "@/hooks/favourite/useRemoveFavourite";
import { useMoviesData } from "@/hooks/movies/useMoviesData";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function MoviesShowsPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const searchParams = useSearchParams();

  const { movies, genresList, favoriteMovieIds, isLoading, error } = useMoviesData();
  const { mutate: addFavorite } = useAddFavourite();
  const { mutate: removeFavorite } = useRemoveFavourite();

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
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <MovieHeroSection />
          <section className="px-20 py-16">
            <div className="flex h-64 items-center justify-center">
              <div className="text-lg text-white">Loading...</div>
            </div>
          </section>
          <FreeTrial />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <MovieHeroSection />
          <section className="px-20 py-16">
            <div className="flex h-64 items-center justify-center">
              <div className="text-lg text-red-500">Error loading data: {error.message}</div>
            </div>
          </section>
          <FreeTrial />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
        <MovieHeroSection />

        <section className="px-20 py-16">
          <div className="mb-12">
            <h2 className="mb-4 font-[Manrope] text-3xl font-bold text-white md:text-4xl">Our Genres</h2>
            <p className="font-[Manrope] text-lg text-[#999999]">
              Explore our diverse collection of movies and shows from action, horror, and more
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4">
            {genresList.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-full border px-4 py-2 transition ${
                  selectedGenre === genre
                    ? "bg-white text-black"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <MovieGrid
            movies={filteredMovies}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favoriteMovieIds={favoriteMovieIds}
          />
        </section>

        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
}
