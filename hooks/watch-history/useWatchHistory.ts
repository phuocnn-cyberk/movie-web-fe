import { useQuery } from '@tanstack/react-query';
import { getWatchHistory } from '@/services/api';
import { WatchHistory } from '@/types/api';
import { useAuthStore } from '@/stores/auth.store';

export const useWatchHistory = () => {
  const { accessToken } = useAuthStore();
  const query = useQuery<WatchHistory[]>({
    queryKey: ['watchHistory', accessToken],
    queryFn: getWatchHistory,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    watchHistory: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
