import { useGetMovies } from "@/hooks/movies/useGetMovies";
import { useCallback, useEffect, useState } from "react";
import { useMovieInteractions } from "./useMovieInteractions";

export const useMovieSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: movies, isLoading } = useGetMovies();
  const slides = movies?.slice(0, 4) || [];

  const { favoriteMovieIds, handleToggleFavorite } = useMovieInteractions();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (slides.length || 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1));
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, slides.length]);

  return {
    currentSlide,
    slides,
    isLoading,
    nextSlide,
    prevSlide,
    goToSlide,
    favoriteMovieIds,
    handleToggleFavorite,
  };
};
