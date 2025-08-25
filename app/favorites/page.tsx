"use client";

import { Header } from "@/components/common/header";
import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { useMoviesData } from "@/hooks/movies/useMoviesData";

export default function FavoritesPage() {
  const { favoriteMovies, isLoading, error } = useMoviesData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] pt-[120px]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white">My Favorites</h1>
        {favoriteMovies.length > 0 ? (
          <MovieGrid movies={favoriteMovies} />
        ) : (
          <p className="text-center text-lg text-gray-400">You have no favorite movies yet.</p>
        )}
      </div>
    </main>
  );
}
