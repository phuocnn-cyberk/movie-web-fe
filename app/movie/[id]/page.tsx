"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { MovieDescription } from "@/components/movie-detail-hero/movie-description";
import { MovieDetailHero } from "@/components/movie-detail-hero/movie-detail-hero";
import { MovieInfoSidebar } from "@/components/movie-detail-hero/movie-info-sidebar";
import { MovieReviews } from "@/components/movie-reviews/movie-reviews";
import { useGetMoviesById } from "@/hooks/movies/useGetMoviesById";
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = Number(params.id);

  const { data: movieData, isLoading, error } = useGetMoviesById(movieId);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-30 dark:bg-[#0F0F0F] flex items-center justify-center">
          <p className="text-lg text-white">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !movieData) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-30 dark:bg-[#0F0F0F] flex items-center justify-center">
          <p className="text-lg text-red-500">
            Error loading movie data: {error?.message || "Movie not found"}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-30 dark:bg-[#0F0F0F]">
        {/* Hero Section */}
        <MovieDetailHero movie={movieData} />

        <div className="w-full px-20 py-10">
          <div className="flex gap-5">
            {/* Left content */}
            <div className="flex flex-1 flex-col">
              <MovieDescription description={movieData.description} />

              {/* ✅ Reviews gọi API */}
              <div className="mt-8">
                <MovieReviews movieId={movieId} />
              </div>
            </div>

            {/* Right Sidebar */}
            <MovieInfoSidebar movie={movieData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
