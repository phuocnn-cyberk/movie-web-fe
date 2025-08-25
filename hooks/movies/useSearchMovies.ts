import { api } from "@/services/api";
import { Movie, PagedMovieResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const fetchSearchMovies = async (query: string) => {
  if (!query) {
    return [];
  }
  const response = await api.get<PagedMovieResponse>(`/api/v1/movies/search`, {
    params: { query },
  });
  return response.data.data;
};

export const useSearchMovies = (query: string) => {
  return useQuery<Movie[]>({
    queryKey: ["searchMovies", query],
    queryFn: () => fetchSearchMovies(query),
    enabled: !!query,
  });
};
