import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/services/api";

export const useGetMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
};