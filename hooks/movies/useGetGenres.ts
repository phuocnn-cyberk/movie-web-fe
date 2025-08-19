import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/services/api";

export const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
};