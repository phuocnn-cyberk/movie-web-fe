"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { getMyWatchHistory } from "@/services/api";
import Image from "next/image";
import Link from "next/link";

interface WatchHistory {
  id: number;
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  watchedAt: string;
}

export default function WatchHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<WatchHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyWatchHistory();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching watch history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-[#202020]">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 text-white pt-[120px]">
        <h1 className="text-2xl font-bold mb-6">Watch History</h1>

        {loading ? (
          <div className="w-full flex justify-center py-10">Loading...</div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-400">No watch history available.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {history.map((item) => (
              <Link
                key={item.id}
                href={`/movies/${item.movieId}`}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
              >
                <div className="relative w-full h-[250px]">
                  <Image
                    src={item.moviePoster || "/default-poster.jpg"}
                    alt={item.movieTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center font-medium">{item.movieTitle}</div>
                <div className="text-center text-sm text-gray-400">
                  Watched on {new Date(item.watchedAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
