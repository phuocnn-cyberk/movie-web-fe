import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/services/api";

export const useGetMoviesById = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
  });
};