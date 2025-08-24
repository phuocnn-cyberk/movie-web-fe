import { useQuery } from "@tanstack/react-query";
import { getRatingsByMovieId } from "@/services/api";

export const useGetRatingMovieById = (movieId: number) => {
  return useQuery({
    queryKey: ["ratings", movieId],
    queryFn: () => getRatingsByMovieId(movieId),
  });
};