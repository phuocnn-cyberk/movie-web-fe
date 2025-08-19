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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <div className="flex h-64 items-center justify-center">
            <div className="text-lg text-white">Đang tải thông tin phim...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !movieData) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
        <Header />
        <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
          <div className="flex h-64 items-center justify-center">
            <div className="text-lg text-red-500">
              Lỗi khi tải thông tin phim: {error?.message || "Không tìm thấy phim"}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden dark:bg-[#202020]">
      <Header />
      <main className="w-full pt-[120px] dark:bg-[#0F0F0F]">
        <MovieDetailHero movie={movieData} />

        {/* Movie Detail Content - 2 Column Layout */}
        <div className="w-full px-20 py-10">
          <div className="flex gap-5">
            {/* Left Column - Description, Cast, Reviews */}
            <div className="flex flex-1 flex-col">
              <MovieDescription description={movieData.description} />
              {/* Cast section can be added here later */}
              <MovieReviews movieId={movieId} />
            </div>

            {/* Right Column - Movie Info Sidebar */}
            <MovieInfoSidebar movie={movieData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
