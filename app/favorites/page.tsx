"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { getProfile, getFavorites, removeFavorite } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface Movie {
  movieId: number;
  title: string;
  posterUrl: string;
}

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();
        setUserId(profile.userID);
        const favData = await getFavorites(profile.userID);
        setFavorites(favData);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRemove = async (movieId: number) => {
    if (!userId) return;
    try {
      await removeFavorite(userId, movieId);
      // Cập nhật UI ngay lập tức
      setFavorites((prev) => prev.filter((m) => m.movieId !== movieId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-[#202020]">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 text-white pt-[120px]">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

        {loading ? (
          <div className="w-full flex justify-center py-10">Loading...</div>
        ) : favorites.length === 0 ? (
          <div className="text-center text-gray-400">No favorite movies yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.movieId}
                className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-transform"
              >
                {/* Nút Remove */}
                <button
                  onClick={() => handleRemove(movie.movieId)}
                  className="absolute top-2 right-2 z-10 p-1 bg-black/60 rounded-full hover:bg-red-500 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <X className="h-4 w-4 text-white" />
                </button>

                {/* Poster + Link */}
                <Link href={`/movies/${movie.movieId}`}>
                  <div className="relative w-full h-[250px]">
                    <Image
                      src={movie.posterUrl || "/default-poster.jpg"}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                {/* Title */}
                <div className="p-3 text-center font-medium">{movie.title}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
