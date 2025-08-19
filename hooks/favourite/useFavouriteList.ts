import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/services/api";
import { Favorite } from "@/types/api";
import { useAuthStore } from "@/stores/auth.store";

export const useFavouriteList = () => {
  const { user } = useAuthStore();
  const userId = user?.userID;

  const {
    data: favouriteList,
    isLoading,
    error,
  } = useQuery<Favorite[]>({
    queryKey: ["favouriteList", userId],
    queryFn: () => getFavorites(userId!),
    enabled: !!userId,
  });
  return { favouriteList, isLoading, error };
};