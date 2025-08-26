"use client";

import { Header } from "@/components/common/header";
import { MovieGrid } from "@/components/movie-grid/movie-grid";
import { useWatchHistoryMovies } from "@/hooks/watch-history/useWatchHistoryMovies";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function WatchHistoryPage() {
  const { watchHistoryMovies, watchHistory, isLoading, error } = useWatchHistoryMovies();

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-[#0F0F0F] pt-[120px]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#E50000]"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen w-full bg-[#0F0F0F] pt-[120px]">
        <Header />
        <div className="container mx-auto max-w-[1250px] px-4 py-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] pt-[120px]">
      <Header />
      <div className="container mx-auto p-20">
        <div className="mb-8 flex items-center gap-3">
          <Calendar className="h-8 w-8 text-[#E50000]" />
          <h1 className="text-4xl font-bold text-white">Watch History</h1>
        </div>

        {watchHistory.length > 0 ? (
          <MovieGrid movies={watchHistoryMovies} watchHistoryMode={true} watchHistoryData={watchHistory} />
        ) : (
          <div className="py-16 text-center">
            <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-600" />
            <p className="mb-2 text-xl text-gray-400">No watch history</p>
            <p className="text-gray-500">Start watching movies to create your watch history.</p>
            <Link
              href="/movies-shows"
              className="mt-4 inline-block rounded-lg bg-[#E50000] px-6 py-3 text-white transition-colors hover:bg-[#CC0000]"
            >
              Discover movies
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
