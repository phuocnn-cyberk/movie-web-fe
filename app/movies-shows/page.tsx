"use client";

import { Footer } from "@/components/common/footer";
import { FreeTrial } from "@/components/common/free-trial";
import { Header } from "@/components/common/header";
import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { MovieHeroSection } from "@/components/movie-hero-section/movie-hero-section";
import { useGetGenres } from "@/hooks/movies/useGetGenres";
import { useGetMovies } from "@/hooks/movies/useGetMovies";
import { useMemo, useState } from "react";

export default function MoviesShowsPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch data from API
  const { data: moviesData, isLoading: moviesLoading, error: moviesError } = useGetMovies();
  const { data: genresData, isLoading: genresLoading, error: genresError } = useGetGenres();

  // Extract movies from response
  // API trả về trực tiếp array, không có wrapper object
  const movies = moviesData || [];
  const genres = genresData || [];

  // Create genres list with "All" option
  const genresList = useMemo(() => {
    const uniqueGenres = ["All", ...genres.map((genre) => genre.name)];
    return uniqueGenres;
  }, [genres]);

  // Filter movies based on selected genre
  const filteredMovies = useMemo(() => {
    if (selectedGenre === "All") {
      return movies;
    }
    return movies.filter((movie) => movie.genres?.some((genre) => genre.name === selectedGenre));
  }, [movies, selectedGenre]);

  // Loading state
  if (moviesLoading || genresLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <MovieHeroSection />
          <section className="px-20 py-16">
            <div className="flex h-64 items-center justify-center">
              <div className="text-lg text-white">Đang tải dữ liệu...</div>
            </div>
          </section>
          <FreeTrial />
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (moviesError || genresError) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <MovieHeroSection />
          <section className="px-20 py-16">
            <div className="flex h-64 items-center justify-center">
              <div className="text-lg text-red-500">
                Lỗi khi tải dữ liệu: {moviesError?.message || genresError?.message}
              </div>
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

          <MovieGrid movies={filteredMovies} />
        </section>

        <FreeTrial />
      </main>
      <Footer />
    </div>
  );
}
