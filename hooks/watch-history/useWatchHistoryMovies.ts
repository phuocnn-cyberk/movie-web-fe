import { useMemo } from 'react';
import { useWatchHistory } from './useWatchHistory';
import { useGetMovies } from '../movies/useGetMovies';
import { Movie } from '@/types/api';

export const useWatchHistoryMovies = () => {
  const { watchHistory, isLoading: watchHistoryLoading, error: watchHistoryError } = useWatchHistory();
  const { data: allMovies, isLoading: moviesLoading, error: moviesError } = useGetMovies();

  const watchHistoryMovies: Movie[] = useMemo(() => {
    if (!allMovies || !watchHistory) return [];
    
    const moviesMap = new Map(allMovies.map(movie => [movie.movieID, movie]));
    
    return watchHistory
      .map(historyItem => moviesMap.get(historyItem.movieId))
      .filter((movie): movie is Movie => movie !== undefined);
  }, [allMovies, watchHistory]);

  return {
    watchHistoryMovies,
    watchHistory,
    isLoading: watchHistoryLoading || moviesLoading,
    error: watchHistoryError || moviesError,
  };
};
